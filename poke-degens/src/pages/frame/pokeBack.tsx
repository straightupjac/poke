import { NEXT_PUBLIC_URL_BASE } from '@/config';
import type { Metadata } from 'next';

import { FrameMetadata } from '@coinbase/onchainkit/frame';
export const metadata: Metadata = {
  title: 'straightupjac.xyz',
  description: 'LFG',
  openGraph: {
    title: 'straightupjac.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL_BASE}/frame-img.jpg`],
  },
};

export default function HomePage() {
  return (
    <FrameMetadata
      image={{
        src: `${NEXT_PUBLIC_URL_BASE}/frame-img.jpg`,
      }}
      input={{
        text: 'Farcaster username',
      }}
      state={{
        counter: 1,
      }}
      postUrl="https://straightupjac.xyz/api/frame"
    />
  );
}

