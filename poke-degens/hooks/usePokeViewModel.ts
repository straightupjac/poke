import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { useState } from "react";

type UsePokeViewModelProps = {
  user: User | null;
};
export type PokeViewModel = {
  pokeError: string | null;
  pokeUser: (username: string) => void;
  pokedUserMessage: string | null;
};

const usePokeViewModel = ({ user }: UsePokeViewModelProps): PokeViewModel => {
  const [pokeError, setPokeError] = useState<string | null>(null);
  const [pokedUserMessage, setPokedUserMessage] = useState<string | null>(null);
  const pokeUser = (username: string) => {
    if (!user) {
      return;
    }

    // send poke user request
    (async () => {
      try {
        const res = await fetch("/api/pokeUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameToPoke: username,
            /** takes their verified ethereum address or custody address */
            verifiedAddressOfPoker: user.verified_addresses.eth_addresses[0],
            custodyAddressOfPoker: user.custody_address,
          }),
        });
        if (res.status === 200) {
          setPokeError(null);
          setPokedUserMessage(`${user.username} poked ${username}!`);
          console.log("pokeUser", res);
        }
        if (res.status === 404) {
          setPokeError("Invalid username to poke");
          setPokedUserMessage(null);
          return;
        }
        if (res.status === 429) {
          setPokeError("You have reached your daily poke quota");
          setPokedUserMessage(null);
          return;
        }
        setPokeError("Error poking user");
        setPokedUserMessage(null);
        return;
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return {
    pokeUser,
    pokeError,
    pokedUserMessage,
  };
};

export default usePokeViewModel;
