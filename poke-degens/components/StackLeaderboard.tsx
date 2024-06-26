'use client'
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { mainnet } from "wagmi/chains";
import { useEnsName } from "wagmi";
import { abridgeAddress, parseAddress, } from "@/utils/crypto";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export type StackLeaderboardRow = {
  address: string;
  amount: number;
}

export const StackLeaderboard = ({ leaderboard }: { leaderboard: StackLeaderboardRow[] }) => {

  if (!leaderboard) return null;

  return (
    <VStack width='100%'>
      {leaderboard.slice(0, 5).map((row, index) => (
        <LeaderboardRow key={index} idx={index} row={row} />
      ))}
      <Text >
      </Text>
      <Link
        href='https://www.stack.so/leaderboard/poke?viewAsPublic=true'
        target="_blank"
      ><Button variant='outline'> More on Stacks Leaderboard</Button></Link>s
    </VStack>
  )
}

const LeaderboardRow = ({ idx, row }: {
  row: StackLeaderboardRow
  idx: number
}) => {

  const { data: ensName } = useEnsName({
    address: parseAddress(row.address),
    chainId: mainnet.id
  })

  return (
    <HStack justify='space-between' width={'100%'}>
      <HStack>
        <Text>
          {idx + 1}
        </Text>
        <Text>
          {ensName || abridgeAddress(row.address)}
        </Text>
      </HStack>
      <Text>
        {row.amount}
      </Text>
    </HStack>
  )
}

export default StackLeaderboard;