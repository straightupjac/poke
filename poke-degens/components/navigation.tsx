'use client'
import { Button, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navigation() {

  return (
    <Stack direction={['column', 'column', 'row']}
      spacing={4}
      justify={['start', 'start', 'center']}
      width='100%'
      align='center'
      gap={4}
      pt={4}>
      <Link
        href="/"
      >
        <Button variant='ghost'>
          home
        </Button>
      </Link>
      <Link
        href="/leaderboard"
        rel="noopener noreferrer"
      > <Button variant='ghost'>
          leaderboard
        </Button>
      </Link>
      <Text p={2}> by bob and straightupjac</Text>
      <ConnectButton showBalance={false} />
    </Stack>
  )
}