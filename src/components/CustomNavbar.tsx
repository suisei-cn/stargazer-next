import { defineVFC, defineVFCWithChild } from '@core/helper'
import {
  Button,
  Navbar,
  useMantineTheme,
  ThemeIcon,
  MantineColor,
  CSSObject,
  NavbarProps
} from '@mantine/core'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

const MainLink = defineVFCWithChild<{
  href: string
  icon: string
  iconColor?: MantineColor
  onClick?: () => void
}>(({ icon, iconColor, children, href, className, onClick }) => {
  const iconColorDetermined = iconColor ?? 'blue'
  const router = useRouter()
  const theme = useMantineTheme()
  const active = router.pathname === href
  const activeBorder: CSSObject = {
    '::before': {
      content: '" "',
      position: 'absolute',
      top: 2,
      left: 2,
      bottom: 2,
      width: 3,
      borderRadius: 1.5,
      backgroundColor: theme.colors[iconColorDetermined][3]
    }
  }
  return (
    <Navbar.Section className={className} onClick={onClick}>
      <Link passHref href={href}>
        <Button
          radius={0}
          size="xl"
          variant={active ? 'light' : 'subtle'}
          fullWidth
          component="a"
          color={'gray'}
          sx={{
            ...(active ? activeBorder : {}),
            display: 'flex',
            padding: '0 1.5rem',
            color: theme.colors.gray[7],
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
        >
          <ThemeIcon
            variant="light"
            size="lg"
            mr={'1rem'}
            color={iconColorDetermined}
          >
            <Icon icon={icon} width={18} />
          </ThemeIcon>
          <div>{children}</div>
        </Button>
      </Link>
    </Navbar.Section>
  )
})

const CustomNavbar = defineVFC<
  {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
  } & Omit<NavbarProps, 'children'>
>(({ opened, setOpened, className, ...prop }) => {
  const theme = useMantineTheme()
  const closeNavBar = () => setOpened(false)

  return (
    <Navbar
      {...prop}
      hiddenBreakpoint="sm"
      hidden={!opened}
      className={className}
      height="calc(100vh - 70px)"
      style={{ minHeight: 'calc(100vh - 70px)' }}
    >
      <MainLink
        icon="bx:home"
        iconColor={'blue'}
        href="/"
        onClick={closeNavBar}
      >
        Home
      </MainLink>
      <MainLink
        icon="akar-icons:circle-check"
        iconColor={'lime'}
        href="/subscription"
        onClick={closeNavBar}
      >
        Subscriptions
      </MainLink>
      <MainLink
        icon="ant-design:setting-outlined"
        iconColor={'violet'}
        href="/settings"
        onClick={closeNavBar}
      >
        Settings
      </MainLink>
      <Navbar.Section
        mt={'auto'}
        sx={{
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          padding: 4
        }}
      >
        User Info
      </Navbar.Section>
    </Navbar>
  )
})

export default CustomNavbar
