/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { Env } from '@/utils/envSetup'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const secrets = {
  FROG_SECRET: Env.FROG_SECRET,
  NEYNAR_API_KEY: Env.NEYNAR_API_KEY,
  POST_URL_BASE: Env.POST_URL_BASE,
}

const POST_URL_BASE = secrets.POST_URL_BASE;
const _devMode = process.env.NODE_ENV === 'development'


const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frames',
  ...(!_devMode && { hub: neynar({ apiKey: secrets.NEYNAR_API_KEY }) }),
  secret: secrets.FROG_SECRET,
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #8A63D2, #17101F)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          You got poked 👉
        </div>
      </div>
    ),
    intents: [
      <Button action="/poke-back">poke back</Button>,
      <Button action="/poke-someone-else">poke others</Button>,
      // <Button.Redirect location="https://pokedegens.xyz">Poke others</Button.Redirect>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

app.frame('/poke-back', async (c) => {
  const { frameData, verified } = c
  const { fid, castId } = frameData ?? {}
  if (!_devMode && !verified) console.error('poke-back: Frame verification failed')
  try {
    const result = await fetch(`${POST_URL_BASE}/pokeBack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        castId,
        fid,
      }),
    })
    const data = await result.json();
    const { success, from, to } = data;
    console.log('poke-back', success, from, to);
  } catch (e) {
    console.error('poke-back', e)
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: '#8A63D2',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 30,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            We had some trouble 😢 Poke back on pokedegens.xyz 🫵
          </div>
        </div>
      ),
      intents: [
        <Button action='/'>go back</Button>,
        <Button.Redirect location="https://pokedegens.xyz">poke</Button.Redirect>,
        <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
      ],
    })
  }


  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: '#8A63D2',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          You poked back! 🫵
        </div>
      </div>
    ),
    intents: [
      <Button action='/'>go back</Button>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

app.frame('/poke-someone-else', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: '#8A63D2',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Poke someone 🤭
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter username to poke" />,
      // <Button action='/send-poke'>Poke</Button>,
      <Button action='/'>go back</Button>,
      <Button.Redirect location="https://pokedegens.xyz">poke</Button.Redirect>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

app.frame('/send-poke', async (c) => {
  const { verified, frameData, } = c
  if (!_devMode && !verified) console.log('send-poke: Frame verification failed')
  const { fid, castId, inputText: usernameToPoke } = frameData ?? {}

  const result = await fetch(`${POST_URL_BASE}/pokeOther`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      castId,
      fid,
      usernameToPoke,
    }),
  })
  const data = await result.json();
  console.log('send-poke', data);


  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: '#8A63D2',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          You poked! 🫵
        </div>
      </div>
    ),
    intents: [
      <Button action='/'>go back</Button>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
