'use client'
import usePokeBackViewModel from "@/hooks/usePokeBackViewModel";
import { Button, Card, Input, Text, VStack } from "@chakra-ui/react";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { useState } from "react";

export const PokeBack = ({ user, usernameToPokeBack, pokeHash }: { user: User | null, usernameToPokeBack: string, pokeHash: string }) => {
  const [alreadyPoked, setAlreadyPoked] = useState<boolean>(false);
  const { pokeUserBack, pokedUserMessage, pokeError } = usePokeBackViewModel({ user, });

  const onPoke = () => {
    pokeUserBack(usernameToPokeBack, pokeHash);
    setAlreadyPoked(true);
  }

  return (
    <Card p={4} minWidth={'300px'}>
      <VStack spacing={4} justify='start' align='start'>
        <Text variant="h1" fontWeight='800' >Poke</Text>
        {pokeError && <Text color='red'>{pokeError}</Text>}
        {pokedUserMessage && <Text>{pokedUserMessage}</Text>}
        <Text>{usernameToPokeBack} poked you! Poke back?</Text>
        <Button
          isDisabled={!usernameToPokeBack || alreadyPoked}
          onClick={onPoke}
          colorScheme='purple'
        >
          <Text variant='body'>Poke back 👉</Text>
        </Button>
      </VStack>
    </Card >
  )
}