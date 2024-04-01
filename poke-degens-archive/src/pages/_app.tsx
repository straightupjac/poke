import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Providers } from "@/providers";
import { Meta } from "@/components/meta";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Providers>
      <Meta />
      <Component {...pageProps} />
    </Providers>
  );
}
