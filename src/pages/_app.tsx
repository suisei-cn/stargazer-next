import '@styles/global.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { RecoilRoot } from 'recoil'

import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

import CustomHeader from '@comps/CustomHeader'
import CustomNavbar from '@comps/CustomNavbar'
import { defineVFC } from '@core/helper'
import i18n from 'i18n'

const App = defineVFC<AppProps>(({ Component, pageProps }) => {
  const [opened, setOpened] = useState(false)
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark')

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>

      <RecoilRoot>
        <I18nextProvider i18n={i18n}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
          >
            <ColorSchemeProvider
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            >
              <NotificationsProvider>
                <AppShell
                  fixed
                  padding={0}
                  navbarOffsetBreakpoint="sm"
                  sx={({ colors }) => ({
                    background:
                      colorScheme === 'dark' ? colors.dark[8] : undefined
                  })}
                  navbar={
                    <CustomNavbar
                      width={{ xs: 300 }}
                      opened={opened}
                      setOpened={setOpened}
                    />
                  }
                  header={
                    <CustomHeader
                      height={70}
                      opened={opened}
                      setOpened={setOpened}
                    />
                  }
                >
                  <Component {...pageProps} />
                </AppShell>
              </NotificationsProvider>
            </ColorSchemeProvider>
          </MantineProvider>
        </I18nextProvider>
      </RecoilRoot>
    </>
  )
})

export default App
