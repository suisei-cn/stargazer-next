import { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { RecoilRoot } from 'recoil'

import { AppShell, MantineProvider } from '@mantine/core'

import CustomHeader from '@comps/CustomHeader'
import CustomNavbar from '@comps/CustomNavbar'
import { defineVFC } from '@core/helper'
import { NotificationsProvider } from '@mantine/notifications'

const App = defineVFC<AppProps>(({ Component, pageProps }) => {
  const [opened, setOpened] = useState(false)

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
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light'
          }}
        >
          <NotificationsProvider>
            <AppShell
              fixed
              padding={0}
              navbarOffsetBreakpoint="sm"
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
        </MantineProvider>
      </RecoilRoot>
    </>
  )
})

export default App
