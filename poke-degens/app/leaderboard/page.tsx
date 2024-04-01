import StackLeaderboard from "@/components/StackLeaderboard";
import Navigation from "@/components/navigation";
import { stackClient } from "@/utils/stacks";
import { Container, Text, VStack } from "@chakra-ui/layout";


export default async function Leaderboard() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Container py={5} px={8} width='100%'>
        <Navigation />
        <VStack gap={2} py={4} width='100%'>
          <Text fontSize='2xl'>Leaderboard</Text>
          <StackLeaderboard leaderboard={data.leaderboard} />
        </VStack>
      </Container>
    </main>
  );
}

async function getData() {
  const leaderboard = await stackClient.getLeaderboard({ limit: 100 });
  return { leaderboard }
}
