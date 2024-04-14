/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { FRAME_URL } from '@/utils/crypto'
import { Env } from '@/utils/envSetup'
import { neynarClient, POKE_CHANNEL_ID } from '@/utils/neynar/neynar'
import { stackClient, StackEvent } from '@/utils/stacks'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const secrets = {
  FROG_SECRET: Env.FROG_SECRET,
  NEYNAR_API_KEY: Env.NEYNAR_API_KEY,
  POST_URL_BASE: Env.POST_URL_BASE,
}

const POST_URL_BASE = secrets.POST_URL_BASE;
const _devMode = process.env.NODE_ENV === 'development'


const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frames',
  ...(!_devMode && { hub: neynar({ apiKey: secrets.NEYNAR_API_KEY }) }),
  secret: secrets.FROG_SECRET,
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #8A63D2, #17101F)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          You got poked 👉
        </div>
      </div>
    ),
    intents: [
      <Button action="/poke-back">poke back</Button>,
      <Button action="/poke-someone-else">poke others</Button>,
      // <Button.Redirect location="https://pokedegens.xyz">Poke others</Button.Redirect>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

app.frame('/poke-back', async (c) => {
  try {
    const { frameData, verified } = c
    const { fid, castId } = frameData ?? {}
    if (!_devMode && !verified) console.error('poke-back: Frame verification failed')

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
      return Response.json(
        {
          message: "You can only poke back the user who poked you",
          success: false,
        },
        { status: 403 }
      );
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
        console.error('poke-back', `${fromUsername} already poked ${usernameToPoke} back! You can't poke back until they poke you.`)
        return c.res({
          image: (
            <div
              style={{
                alignItems: 'center',
                background: '#8A63D2',
                backgroundSize: '100% 100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: 60,
                  fontStyle: 'normal',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.4,
                  marginTop: 30,
                  padding: '0 120px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {fromUsername} already poked {usernameToPoke} back! You can&apos;t poke back until they poke you.
              </div>
            </div>
          ),
          intents: [
            <Button.Redirect location="https://pokedegens.xyz">poke others</Button.Redirect>,
            <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
          ],
        })
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
      await stackClient.track(StackEvent.user_poke, {
        points: 10,
        account: address,
      });
    }

  } catch (e) {
    console.error('poke-back', e)
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: '#8A63D2',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 30,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            We had some trouble 😢 <br />
            Poke back later 🫵
          </div>
        </div>
      ),
      intents: [
        <Button action='/'>go back</Button>,
        <Button.Redirect location="https://pokedegens.xyz">poke others</Button.Redirect>,
        <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
      ],
    })
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: '#8A63D2',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          You poked back! 🫵
        </div>
      </div>
    ),
    intents: [
      <Button action='/'>go back</Button>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

app.frame('/poke-someone-else', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: '#8A63D2',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Poke someone 🤭
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter username to poke" />,
      <Button action='/send-poke'>poke</Button>,
      // <Button action='/'>go back</Button>,
      // <Button.Redirect location="https://pokedegens.xyz">poke</Button.Redirect>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

app.frame('/send-poke', async (c) => {
  const { verified, frameData, } = c
  if (!_devMode && !verified) console.log('send-poke: Frame verification failed')
  const { fid, castId, inputText: usernameToPoke } = frameData ?? {}

  const result = await fetch(`${POST_URL_BASE}/pokeOther`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      castId,
      fid,
      usernameToPoke,
    }),
  })
  const data = await result.json();
  console.log('send-poke', data);


  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: '#8A63D2',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          You poked! 🫵
        </div>
      </div>
    ),
    intents: [
      <Button action='/'>go back</Button>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
