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
  Title,
  useMantineTheme
} from '@mantine/core'

import PageBanner from '@comps/PageBanner'
import { useToggleSetting, withLoadingState, withSettings } from '@core/setting'

import type { NextPage } from 'next'
import { DataLoadState } from '@core/const'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { useDarkMode } from '@core/utils'

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
  const { colors } = useMantineTheme()
  const { t } = useTranslation()

  const borderColor = useDarkMode() ? colors.dark[5] : colors.gray[4]

  return (
    <>
      <PageBanner
        title={t('setting.banner.title')}
        description={t('setting.banner.description')}
      />
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
          sx={{
            paddingBottom: '0.5rem',
            borderBottom: '1px solid',
            borderBottomColor: borderColor
          }}
        >
          {t('setting.options.notification.title')}
        </Title>
        <Box
          mx={12}
          mb={20}
          sx={{
            borderRadius: '6px',
            border: '1px solid',
            borderColor: borderColor
          }}
        >
          {groups.map((group, index) => (
            <Box
              key={index}
              sx={{
                'padding': '1rem',
                'borderBottom': '1px solid',
                'borderColor': borderColor,
                '&:last-child': {
                  borderBottom: 'none'
                }
              }}
            >
              <Title mx={8} mb={16} order={4}>
                {group.title}
              </Title>
              {group.settings.map(setting => (
                <Group
                  key={setting.key}
                  m={8}
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleSetting(setting.key)}
                >
                  <Checkbox checked={setting.value} onChange={() => {}} />
                  <Text size="sm" color="gray">
                    {t(`setting.options.notification.${setting.key}` as any)}
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
