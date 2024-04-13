'use client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { theme } from '@/styles/theme';

const walletConfig = getDefaultConfig({
  appName: 'poke',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'test',
  chains: [polygon, optimism, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

const customTheme = extendTheme(theme)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={customTheme}>
      <WagmiProvider config={walletConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="compact">
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );

}