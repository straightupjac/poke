import { NEXT_PUBLIC_URL } from '@/config';
import { FrameMetadata } from '@coinbase/onchainkit/frame';

export default function HomePage() {
  return (
    <FrameMetadata
      buttons={[
        {
          label: 'Poke',
        },
        {
          label: 'Poke back',
          action: 'post_redirect',
        },
        {
          action: 'link',
          label: '$POKE leaderboard',
          target: 'https://poke-degen.vercel.app/leaderboard',
        },
      ]}
      image={{
        src: `${NEXT_PUBLIC_URL}/park-3.png`,
        aspectRatio: '1:1'
      }}
      input={{
        text: 'Tell me a boat story',
      }}
      state={{
        counter: 1,
      }}
      postUrl={`${NEXT_PUBLIC_URL}/api/frame`}
    />

  );
}