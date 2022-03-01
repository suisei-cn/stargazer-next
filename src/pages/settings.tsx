import { useRecoilValue } from 'recoil'

import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  LoadingOverlay,
  Text,
  Title
} from '@mantine/core'

import PageBanner from '@comps/PageBanner'
import { useToggleSetting, withLoadingState, withSettings } from '@core/setting'

import type { NextPage } from 'next'
import { DataLoadState } from '@core/const'
import { Icon } from '@iconify/react'

const loadError = (
  <Container sx={theme => ({ color: theme.colors.dark[3] })}>
    <Center mt={60} mb={40}>
      <Icon icon="carbon:data-error" width={60} />
    </Center>
    <Center mb={20}>
      <Text>Oops! There&apos;s some problem loading the data</Text>
    </Center>
    <Center>
      <Button
        component="a"
        href="https://github.com/suisei-cn/stargazer-next/issues/new"
        variant="light"
      >
        Report the issue
      </Button>
    </Center>
  </Container>
)

const Home: NextPage = () => {
  const groups = useRecoilValue(withSettings)
  const state = useRecoilValue(withLoadingState)
  const toggleSetting = useToggleSetting()

  return (
    <>
      <PageBanner title="Settings" description="Notifications and more" />
      <Container
        size="lg"
        sx={{
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          position: 'relative',
          minHeight: 'calc(100vh - 15rem)'
        }}
      >
        <LoadingOverlay visible={state === DataLoadState.Loading} />
        <LoadingOverlay
          visible={state === DataLoadState.Error}
          loader={loadError}
        />
        <Title
          order={2}
          mx={12}
          my={20}
          sx={theme => ({
            paddingBottom: '0.5rem',
            borderBottom: '1px solid',
            borderBottomColor: theme.colors.gray[4]
          })}
        >
          Notifications
        </Title>
        <Box
          mx={12}
          mb={20}
          sx={theme => ({
            borderRadius: '6px',
            border: '1px solid',
            borderColor: theme.colors.gray[3]
          })}
        >
          {groups.map((group, index) => (
            <Box
              key={index}
              sx={theme => ({
                'padding': '1rem',
                'borderBottom': '1px solid',
                'borderColor': theme.colors.gray[3],
                '&:last-child': {
                  borderBottom: 'none'
                }
              })}
            >
              <Title mx={8} mb={16} order={4}>
                {group.title}
              </Title>
              {group.settings.map(setting => (
                <Group key={setting.key} m={8}>
                  <Checkbox
                    checked={setting.value}
                    onChange={() => toggleSetting(setting.key)}
                  />
                  <Text size="sm" color="gray">
                    {setting.text}
                  </Text>
                </Group>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </>
  )
}

export default Home
