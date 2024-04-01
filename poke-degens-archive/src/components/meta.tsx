import Head from 'next/head';

export const Meta = () => {
  return (
    <>

      <Head>
        <title>Poke Degens</title>
        <meta name='title' content='Poke Degens' />
        <meta name='description' content='poke your friends. earn $degen' />
        <meta name='og:image' content='/preview.png' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:type' content='website' />
        <meta name='og:title' content='Poke Degens' />
        <meta name='og:description' content='poke your friends. earn $degen' />
      </Head>
    </>
  );
};