'use client'
import { Button, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navigation() {

  return (
    <Stack direction={['column', 'column', 'row']}
      spacing={4}
      justify={['start', 'start', 'space-between']}
      width='100%'
      align='center'
      gap={4}
      background={'purple.800'}
      py={4}
      px={16}
    >
      <HStack>
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
      </HStack>
      <ConnectButton showBalance={false} />
    </Stack>
  )
}