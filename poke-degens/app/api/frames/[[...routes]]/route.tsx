/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { Env } from '@/utils/envSetup'
import poke, { PokeStatus } from '@/utils/frames/poke'
import pokeBack, { PokeBackStatus } from '@/utils/frames/pokeBack'
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
          alignItems: "center",
          background: "#8A63D2",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
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
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

app.frame('/poke-back', async (c) => {
  try {
    const { frameData, verified } = c
    const { fid, castId } = frameData ?? {}
    if (!_devMode && !verified) console.error('poke-back: Frame verification failed')

    const { status } = await pokeBack({ fid, castId });
    switch (status) {
      case PokeBackStatus.Success: {
        return c.res({
          image: (
            <div
              style={{
                alignItems: "center",
                background: "#8A63D2",
                backgroundSize: "100% 100%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                height: "100%",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
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
            <Button action="/poke-someone-else">poke others</Button>,
            <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
          ],
        })
      }
      case PokeBackStatus.OutOfDailyPokeQuota: {
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
                You have reached your daily poke quota 🫵
              </div>
            </div>
          ),
          intents: [
            <Button action='/'>go back</Button>,
            <Button action="/poke-someone-else">poke others</Button>,
            <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
          ],
        })
      }
      case PokeBackStatus.Error: {
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
                We had some trouble poking back 😢 <br />
              </div>
            </div>
          ),
          intents: [
            <Button action='/'>go back</Button>,
            <Button action="/poke-someone-else">poke others</Button>,
            <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
          ],
        })
      }
      case PokeBackStatus.UserIsNotPoked: {
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
                You can only poke back if you&apos;ve been poked🫵
              </div>
            </div>
          ),
          intents: [
            <Button action='/'>go back</Button>,
            <Button action="/poke-someone-else">poke others</Button>,
            <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
          ],
        })
      }
      case PokeBackStatus.AlreadyPoked: {
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
                You already poked back! 🫵
              </div>
            </div>
          ),
          intents: [
            <Button action='/'>go back</Button>,
            <Button action="/poke-someone-else">poke others</Button>,
            <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
          ],
        })
      }
    }

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
            We had some trouble 😢 <br />
            Poke back later 🫵
          </div>
        </div>
      ),
      intents: [
        <Button action='/'>go back</Button>,
        <Button action="/poke-someone-else">poke others</Button>,
        <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
      ],
    })
  }
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
          Poke someone else 🤭
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter username to poke" />,
      <Button action='/'>go back</Button>,
      <Button action='/send-poke'>poke</Button>,
      <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
    ],
  })
})

app.frame('/send-poke', async (c) => {
  const { verified, frameData, } = c
  if (!_devMode && !verified) console.log('send-poke: Frame verification failed')
  const { fid, castId, inputText: usernameToPoke } = frameData ?? {}

  const { status } = await poke({ fid, castId, usernameToPoke });

  switch (status) {
    case PokeStatus.Success: {
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
          <Button action="/poke-someone-else">poke others</Button>,
          <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
        ],
      })
    }
    case PokeStatus.OutOfDailyPokeQuota: {
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
              You have reached your daily poke quota 🫵
            </div>
          </div>
        ),
        intents: [
          <Button action='/'>go back</Button>,
          <Button action="/poke-someone-else">poke others</Button>,
          <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
        ],
      })
    }
    case PokeStatus.UserToPokeNotFound: {
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
              the user does not exist<br />
            </div>
          </div>
        ),
        intents: [
          <Button.Redirect location="https://pokedegens.xyz">try again</Button.Redirect>,
          <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
        ],
      })
    }
    case PokeStatus.Error: {
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
              We had some trouble poking 😢 <br />
            </div>
          </div>
        ),
        intents: [
          <Button.Redirect location="https://pokedegens.xyz">try again</Button.Redirect>,
          <Button.Redirect location="https://pokedegens.xyz/leaderboard">leader board</Button.Redirect>,
        ],
      })
    }
  }
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
