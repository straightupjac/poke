
import { FarcasterUser } from "@/components/FarcasterDisplay";
import Navigation from "@/components/navigation";
import { Poke } from "@/components/poke";
import useGetFarcasterUserByAddress from "@/hooks/useGetFarcasterUserByAddress";
import { VStack } from "@chakra-ui/layout";
import { useAccount } from "wagmi";

export default function Home() {
  const farcasterUser = useGetFarcasterUserByAddress();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <VStack spacing={5} py={5}>
        <FarcasterUser user={farcasterUser} />
        <Poke user={farcasterUser} />
      </VStack>
    </main>
  );
}
