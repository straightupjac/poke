import usePokeViewModel from "@/hooks/usePokeViewModel";
import { Button, Card, Input, Text, VStack } from "@chakra-ui/react";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { ChangeEvent, useState } from "react";

export const Poke = ({ user }: { user: User | null }) => {
  const [usernameToPoke, setUsernameToPoke] = useState<string>("");
  const { pokeUser } = usePokeViewModel({ user });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameToPoke(e.target.value);
  }

  const onPoke = () => {
    pokeUser(usernameToPoke);
  }

  return (
    <Card p={4}>
      <VStack spacing={4} justify='start' align='start'>
        <Text variant="h1">Poke</Text>
        <Input placeholder='Farcaster profile' onChange={onChange} value={usernameToPoke} />
        <Button
          isDisabled={!usernameToPoke}
          onClick={onPoke}
        >poke</Button>
      </VStack>
    </Card >
  )
}