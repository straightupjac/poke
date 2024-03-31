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
    /** takes their custody address */
    const userCustodyAddress = user.custody_address;
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
            custodyAddressOfPoker: userCustodyAddress,
          }),
        });
        if (res.status === 404) {
          setPokeError("Invalid username to poke");
          setPokedUserMessage(null);
          return;
        }
        setPokeError(null);
        setPokedUserMessage(`${user.username} poked ${username}!`);
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
