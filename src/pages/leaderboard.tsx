import StackLeaderboard, { StackLeaderboardRow } from "@/components/StackLeaderboard";
import Navigation from "@/components/navigation";
import { stackClient } from "@/utils/stacks";


type LeaderboardProps = {
  leaderboard: StackLeaderboardRow[];
};

export default function Leaderboard(props: LeaderboardProps) {
  return (
    <main className="flex min-h-screen flex-col p-24 items-center">
      <Navigation />
      <div className="pt-4">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Leaderboard
        </h2>
        <StackLeaderboard leaderboard={props.leaderboard} />
      </div>
    </main>
  );
}

export const getServerSideProps = (async () => {
  const leaderboard = await stackClient.getLeaderboard({ limit: 100 });
  return { props: { leaderboard } }
})