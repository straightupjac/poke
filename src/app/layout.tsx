import './globals.css';

import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Poke $SILLY",
  description: "poke your degen friends",
};


function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Providers>
            {children}
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
}

export default RootLayout;
