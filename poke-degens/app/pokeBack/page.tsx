'use client'
import { VStack, Text } from '@chakra-ui/react'
import { FarcasterUser } from '@/components/FarcasterDisplay'
import useGetFarcasterUserByAddress from '@/hooks/useGetFarcasterUserByAddress'
import { useRouter } from 'next/router'
import { PokeBack } from '@/components/pokeBack'
import isString from 'lodash/isString'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/navigation'

export default function Home() {
  const farcasterUser = useGetFarcasterUserByAddress();
  const queryParams = useSearchParams()
  const username = queryParams.get('username')
  const pokeHash = queryParams.get('pokeHash')

  if (!username || !isString(username) ||
    !pokeHash || !isString(pokeHash)) {
    return <></>
  }

  const usernameToPokeBack = username as string;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      <VStack spacing={5} py={10} width="100%">
        <Text fontSize="2xl">poke your degen frens 👉</Text>
        <FarcasterUser user={farcasterUser} />
        <PokeBack user={farcasterUser} usernameToPokeBack={usernameToPokeBack} pokeHash={pokeHash} />
      </VStack>
    </main>
  )
}
