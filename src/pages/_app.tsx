import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/providers";
import { Meta } from "@/components/meta";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Providers>
        <Meta />
        <Component {...pageProps} />
      </Providers>
    </SessionProvider>
  );
}
