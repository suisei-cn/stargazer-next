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
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
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
        <Menu
          control={
            <ActionIcon variant="light" color="blue" size="lg" mr={12}>
              <Icon icon="ion:language" />
            </ActionIcon>
          }
        >
          <Menu.Item onClick={() => i18n.changeLanguage('en')}>
            English
          </Menu.Item>
          <Menu.Item onClick={() => i18n.changeLanguage('zh')}>
            简体中文
          </Menu.Item>
          <Menu.Item disabled>日本語</Menu.Item>
          {/* ...other items */}
        </Menu>

        <ActionIcon
          variant="light"
          color="blue"
          size="lg"
          mr={12}
          onClick={() => toggleColorScheme()}
        >
          <Icon icon="gg:dark-mode" />
        </ActionIcon>

        <LinkButton
          href="https://github.com/suisei-cn/stargazer-next"
          icon="akar-icons:github-fill"
        />
      </Box>
    </Header>
  )
})

export default CustomHeader
