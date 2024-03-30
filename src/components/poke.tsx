import { Button, Card, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const Poke = () => {
  const onPoke = () => {
    console.log('poke')
    /**
     * send API call to poke leaderboard
     *
     */
  }

  return (
    <Card p={4}>
      <VStack spacing={4} justify='start' align='start'>
        <Text variant="h1">Poke</Text>
        <Input placeholder='Farcaster profile' />
        <Button onClick={onPoke} >poke</Button>
      </VStack>
    </Card >
  )
}