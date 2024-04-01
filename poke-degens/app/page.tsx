'use client'
import Navigation from '@/components/navigation'
import { VStack, Text } from '@chakra-ui/react'
import { FarcasterUser } from '@/components/FarcasterDisplay'
import useGetFarcasterUserByAddress from '@/hooks/useGetFarcasterUserByAddress'
import { Poke } from '@/components/poke'

export default function Home() {
  const farcasterUser = useGetFarcasterUserByAddress();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      <VStack spacing={5} py={10} width="100%">
        <Text fontSize="2xl">Poke your degen friends 👉</Text>
        <FarcasterUser user={farcasterUser} />
        <Poke user={farcasterUser} />
      </VStack>
    </main>
  )
}
