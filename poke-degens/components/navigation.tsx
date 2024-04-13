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
      background={'purple.900'}
      py={4}
      px={16}
    >
      <HStack>
        <Link
          href="/"
        >
          <IconButton variant='ghost' color='white' icon={<Text> 👉</Text>} aria-label="home" size={'32'} />
        </Link>
        <Link
          href="/leaderboard"
          rel="noopener noreferrer"
        > <Button variant='ghost' color='white'>
            leaderboard
          </Button>
        </Link>
      </HStack>
      <ConnectButton showBalance={false} />
    </Stack>
  )
}