import StackLeaderboard, { StackLeaderboardRow } from "@/components/StackLeaderboard";
import Navigation from "@/components/navigation";
import { stackClient } from "@/utils/stacks";
import { Container } from "@chakra-ui/layout";


export default async function Leaderboard() {
  const data = await getData()

  return (
    <main>
      <Container py={5} px={8}>
        <Navigation />
        <div className="pt-4">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Leaderboard
          </h2>
          <StackLeaderboard leaderboard={data.leaderboard} />
        </div>
      </Container>
    </main>
  );
}

async function getData() {
  const leaderboard = await stackClient.getLeaderboard({ limit: 100 });
  return { leaderboard }
}
