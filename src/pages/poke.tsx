import { FarcasterProfile } from "@/components/SignInWithFarcaster";
import { VStack } from "@chakra-ui/layout";
import Navigation from "@components/navigation";
import { Poke } from "@components/poke";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <VStack spacing={5} py={5}>
        <FarcasterProfile />
        <Poke />
      </VStack>
    </main>
  );
}
