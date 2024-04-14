import { FRAME_URL } from "../crypto";
import { Env } from "../envSetup";
import { neynarClient, POKE_CHANNEL_ID } from "../neynar/neynar";
import { stackClient, StackEvent } from "../stacks";

export enum PokeBackStatus {
  Success = "success",
  AlreadyPoked = "already-poked",
  UserIsNotPoked = "user-is-not-poked",
  Error = "error",
}

export default async function pokeBack({
  fid,
  castId,
}: {
  fid?: number;
  castId?: {
    fid: number;
    hash: string;
  };
}): Promise<{
  status: PokeBackStatus;
  message: string;
}> {
  try {
    if (!fid) throw new Error("fid is required");
    if (!castId) throw new Error("castId is required");

    const result = await neynarClient.lookUpCastByHashOrWarpcastUrl(
      castId.hash,
      "hash"
    );

    const { cast } = result;
    const mentionedProfiles = cast.mentioned_profiles;
    const usernameToPoke = mentionedProfiles[0].username;
    const usernamePoked = mentionedProfiles[1].username;

    const pokeUser = (await neynarClient.fetchBulkUsers([fid])).users[0];
    const fromUsername = pokeUser.username;

    if (fromUsername !== usernamePoked) {
      return {
        status: PokeBackStatus.UserIsNotPoked,
        message: "You can only poke back the user who poked you",
      };
    }
    let address = null;
    if (pokeUser.verified_addresses.eth_addresses.length) {
      address = pokeUser.verified_addresses.eth_addresses[0];
    } else {
      address = pokeUser.custody_address;
    }

    const pokeChainCast = await neynarClient.lookUpCastByHashOrWarpcastUrl(
      castId.hash,
      "hash"
    );

    if (pokeChainCast.cast.replies.count > 0) {
      const getCastThread = await neynarClient.fetchAllCastsInThread(
        pokeChainCast.cast.hash
      );
      // make sure no one has poked back yet
      const alreadyPokedBack = getCastThread.result.casts.find((cast) => {
        return cast.text
          .trim()
          .includes(`@${fromUsername} poked @${usernameToPoke} back`);
      });
      if (alreadyPokedBack) {
        console.error(
          "poke-back",
          `${fromUsername} already poked ${usernameToPoke} back! You can't poke back until they poke you.`
        );
        return {
          status: PokeBackStatus.AlreadyPoked,
          message: `${fromUsername} already poked ${usernameToPoke} back! You can't poke back until they poke you.`,
        };
      }
    }

    /** publish poke cast on warpcast */
    await neynarClient.publishCast(
      Env.NEYNAR_SIGNER_UUID,
      `@${fromUsername} poked @${usernameToPoke} back!`,
      {
        embeds: [
          {
            url: FRAME_URL,
          },
        ],
        channelId: POKE_CHANNEL_ID,
        replyTo: castId.hash,
      }
    );
    /** register poke on leaderboard */
    await stackClient.track(StackEvent.user_poke_back, {
      points: 10,
      account: address,
    });

    return {
      status: PokeBackStatus.Success,
      message: `${fromUsername} poked ${usernameToPoke} back! Points added to ${address}`,
    };
  } catch (error) {
    console.error("poke-back", error);
    return {
      status: PokeBackStatus.Error,
      message:
        "An error occurred while trying to poke back. Please try again later.",
    };
  }
}
