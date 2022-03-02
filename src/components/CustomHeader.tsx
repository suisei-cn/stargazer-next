import { defineVFC } from '@core/helper'
import { Icon } from '@iconify/react'

import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Header,
  HeaderProps,
  MediaQuery,
  Space,
  Text,
  useMantineTheme
} from '@mantine/core'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import LinkButton from './LinkButton'

const CustomHeader = defineVFC<
  {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
  } & Omit<HeaderProps, 'children'>
>(({ opened, setOpened, ...prop }) => {
  const theme = useMantineTheme()

  return (
    <Header {...prop} padding="md">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
            paddingLeft: '2rem',
            paddingRight: '1rem'
          }
        }}
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
        <Text size="xl">Stargazer Reborn</Text>
        <Space sx={{ flexGrow: 1 }} />
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <LinkButton
            href="https://github.com/suisei-cn/stargazer-next"
            icon="akar-icons:github-fill"
          />
        </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <LinkButton
            href="https://github.com/suisei-cn/stargazer-next"
            icon="akar-icons:github-fill"
            text="Github"
          />
        </MediaQuery>
      </Box>
    </Header>
  )
})

export default CustomHeader
