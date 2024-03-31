import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useGetFarcasterUserByAddress = () => {
  const account = useAccount();
  const [farcasterUser, setFarcasterUser] = useState<User | null>(null);

  useEffect(() => {
    if (!account.address) return;
    const address = account.address as string;
    if (farcasterUser?.verifications.includes(address)) {
      console.log("user already fetched", farcasterUser);
      return;
    }
    (async () => {
      console.log("fetching user", address);
      const user = await (
        await fetch(`/api/getFarcasterUserByAddress?address=${address}`)
      ).json();
      console.log("user: ", user);
      setFarcasterUser(user);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.address]);

  return farcasterUser;
};

export default useGetFarcasterUserByAddress;
