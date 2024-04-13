import { Text, VStack } from "@chakra-ui/layout";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export const FarcasterUser = ({ user }: { user: User | null }) => {
  console.log('user', user)
  if (!user?.display_name) {
    return <Text>Please connect your wallet to poke.</Text>
  }
  return (
    <VStack>
      <Text>
        hi {user.username}
      </Text>
    </VStack>
  )
}