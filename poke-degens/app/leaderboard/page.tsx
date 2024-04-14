import Navigation from "@/components/navigation";
import { stackClient } from "@/utils/stacks";
import { Container, Text, VStack } from "@chakra-ui/layout";


export default async function Leaderboard() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      <Container width='100%'>
        <VStack gap={2} py={4} width='100%' height='100%'>
          <Text fontSize='2xl'>Leaderboard</Text>
          <iframe src="https://www.stack.so/leaderboard/poke?viewAsPublic=true" width="100%" height="1000px"></iframe>
        </VStack>
      </Container>
    </main>
  );
}

async function getData() {
  const leaderboard = await stackClient.getLeaderboard({ limit: 100 });
  return { leaderboard }
}
