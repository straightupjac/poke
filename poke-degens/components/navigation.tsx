'use client'
import { Button, Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Navigation() {

  return (
    <Stack direction={['column', 'column', 'row']}
      spacing={4}
      justify={['start', 'start', 'space-between']}
      width='100%'
      align='center'
      alignItems='start'
      gap={4}
      background={'purple.800'}
      py={4}
      px={[8, 8, 16]}
    >
      <Stack direction={['column', 'column', 'row']}
        justify='start'
        width='100%'
      >
        <Link
          href="/"
        >
          <IconButton colorScheme='purple' variant='solid' color='white' icon={<Text fontSize={'40'} px={5}> 👉</Text>} aria-label="home" />
        </Link>
        <Link
          href="/leaderboard"
          rel="noopener noreferrer"
        > <Button colorScheme='purple' variant='solid' color='white'>
            leaderboard
          </Button>
        </Link>
        <Link
          href="https://warpcast.com/~/channel/poke"
          rel="noopener noreferrer"
          target="_blank"
        > <Button colorScheme='purple' variant='solid' color='white' leftIcon={
          <>
            <Image
              src="/farcaster.png"
              width={30}
              height={30}
              alt="farcaster"
            /></>
        }>
            /poke channel
          </Button>
        </Link>
      </Stack>
      <Flex width='100%' justify={['start', 'start', 'end']}>
        <ConnectButton showBalance={false} />
      </Flex>
    </Stack >
  )
}