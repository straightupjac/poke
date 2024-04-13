'use client'
import usePokeViewModel from "@/hooks/usePokeViewModel";
import { Button, Card, Input, Text, VStack } from "@chakra-ui/react";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { ChangeEvent, useState } from "react";

export const Poke = ({ user }: { user: User | null }) => {
  const [usernameToPoke, setUsernameToPoke] = useState<string>("");
  const [alreadyPoked, setAlreadyPoked] = useState<boolean>(false);
  const { pokeUser, pokedUserMessage, pokeError } = usePokeViewModel({ user });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameToPoke(e.target.value);
  }

  const onPoke = () => {
    if (!usernameToPoke) return;
    console.log('poking', usernameToPoke)
    pokeUser(usernameToPoke);
    setAlreadyPoked(true);
  }

  return (
    <Card p={4} minWidth={'300px'}>
      <VStack spacing={4} justify='start' align='start'>
        <Text variant="h1">Poke</Text>
        {pokeError && <Text color='red'>{pokeError}</Text>}
        {pokedUserMessage && <Text>{pokedUserMessage}</Text>}
        <Input placeholder='Warpcast handle' onChange={onChange} value={usernameToPoke} />
        <Button
          isDisabled={!usernameToPoke || alreadyPoked}
          onClick={onPoke}
        >
          <Text variant='body'>Poke</Text>
        </Button>
      </VStack>
    </Card >
  )
}