
import Navigation from "@/components/navigation";
import { Poke } from "@/components/poke";
import { VStack } from "@chakra-ui/layout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <VStack spacing={5} py={5}>
        {/* <FarcasterProfile /> */}
        <Poke />
      </VStack>
    </main>
  );
}
