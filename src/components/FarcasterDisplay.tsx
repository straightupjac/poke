import { Text, VStack } from "@chakra-ui/layout";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export const FarcasterUser = ({ user }: { user: User | null }) => {
  if (!user) {
    return <Text>Please connect your wallet.</Text>
  }
  return (
    <VStack>
      <Text>
        hi {user.username}
      </Text>
    </VStack>
  )
}