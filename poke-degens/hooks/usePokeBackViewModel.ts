import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { useState } from "react";

type UsePokeViewModelProps = {
  user: User | null;
};
export type PokeViewModel = {
  pokeError: string | null;
  pokeUserBack: (username: string, pokeHash: string) => void;
  pokedUserMessage: string | null;
};

const usePokeBackViewModel = ({
  user,
}: UsePokeViewModelProps): PokeViewModel => {
  const [pokeError, setPokeError] = useState<string | null>(null);
  const [pokedUserMessage, setPokedUserMessage] = useState<string | null>(null);
  const pokeUserBack = (username: string, pokeHash: string) => {
    if (!user) {
      return;
    }

    // send poke user request
    (async () => {
      try {
        const res = await fetch("/api/pokeUserBack", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameToPoke: username,
            pokeHash,
            /** takes their verified ethereum address or custody address */
            verifiedAddressOfPoker: user.verified_addresses.eth_addresses[0],
            custodyAddressOfPoker: user.custody_address,
          }),
        });
        if (res.status === 404) {
          setPokeError("Invalid username to poke");
          setPokedUserMessage(null);
          return;
        }
        setPokeError(null);
        setPokedUserMessage(`${user.username} poked ${username} back!`);
        console.log("pokeUser", res);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return {
    pokeUserBack,
    pokeError,
    pokedUserMessage,
  };
};

export default usePokeBackViewModel;
