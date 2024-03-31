import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";

type UsePokeViewModelProps = {
  user: User | null;
};
export type PokeViewModel = {
  pokeUser: (username: string) => void;
};

const usePokeViewModel = ({ user }: UsePokeViewModelProps): PokeViewModel => {
  const pokeUser = (username: string) => {
    if (!user) {
      return;
    }

    /**
     * send API call to poke leaderboard
     * send call to say so and so poked you
     */
  };

  return {
    pokeUser,
  };
};

export default usePokeViewModel;
