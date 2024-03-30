import * as React from 'react';
import {
  AuthKitProvider,
} from "@farcaster/auth-kit";
import '@farcaster/auth-kit/styles.css';
import { ChakraProvider } from '@chakra-ui/react'
import { NEXT_PUBLIC_URL_BASE } from './config';


const farcasterConfig = {
  rpcUrl: "https://mainnet.optimism.io",
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