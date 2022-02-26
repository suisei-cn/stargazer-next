import 'windi.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import {
  AppShell,
  Burger,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme
} from '@mantine/core'
import { useState } from 'react'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()

  const appShell = (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300, lg: 400 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} padding="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(o => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      {<Component {...pageProps} />}
    </AppShell>
  )

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light'
        }}
      >
        {appShell}
      </MantineProvider>
    </>
  )
}
