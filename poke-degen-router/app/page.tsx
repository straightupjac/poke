'use client'
import Navigation from '@/components/navigation'
import { VStack } from '@chakra-ui/react'
import { FarcasterUser } from '@/components/FarcasterDisplay'
import useGetFarcasterUserByAddress from '@/hooks/useGetFarcasterUserByAddress'
import { Poke } from '@/components/poke'

export default function Home() {
  const farcasterUser = useGetFarcasterUserByAddress();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <VStack spacing={5} py={5}>
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Poke your degen friends
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <FarcasterUser user={farcasterUser} />
        <Poke user={farcasterUser} />
      </VStack>
    </main>
  )
}
