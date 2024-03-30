import * as React from 'react';
import {
  AuthKitProvider,
} from "@farcaster/auth-kit";
import '@farcaster/auth-kit/styles.css';
import { ChakraProvider } from '@chakra-ui/react'


const farcasterConfig = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  siweUri: "https://poke-degen.vercel.app/",
  domain: "https://poke-degen.vercel.app/",
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <AuthKitProvider config={farcasterConfig}>
        {children}
      </AuthKitProvider>
    </ChakraProvider>
  );

}