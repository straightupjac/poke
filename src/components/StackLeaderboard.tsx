import { HStack, Text, VStack } from "@chakra-ui/layout";
import { mainnet } from "wagmi/chains";
import { useEnsName } from "wagmi";
import { parseAddress, } from "@/utils/crypto";

export type StackLeaderboardRow = {
  address: string;
  amount: number;
}

export const StackLeaderboard = ({ leaderboard }: { leaderboard: StackLeaderboardRow[] }) => {

  if (!leaderboard) return null;

  return (
    <VStack>
      {leaderboard.map((row, index) => (
        <LeaderboardRow key={index} idx={index} row={row} />
      ))}
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

  console.log('result', ensName)
  return (
    <HStack justify='space-between' width={'100%'}>
      <HStack>
        <Text>
          {idx + 1}
        </Text>
        <Text>
          {ensName || row.address}
        </Text>
      </HStack>
      <Text>
        {row.amount}
      </Text>
    </HStack>
  )
}

export default StackLeaderboard;