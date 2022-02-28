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

const LinkButton = defineVFC<{ icon: string; href: string; text?: string }>(
  ({ href, text, icon, className }) => {
    const iconNode = <Icon icon={icon} />
    return (
      <Link passHref href={href}>
        {text ? (
          <Button
            variant="light"
            rightIcon={iconNode}
            component="a"
            className={className}
          >
            {text}
          </Button>
        ) : (
          <ActionIcon
            component="a"
            variant="light"
            size="lg"
            color="blue"
            className={className}
          >
            {iconNode}
          </ActionIcon>
        )}
      </Link>
    )
  }
)

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
