import { defineVFC } from '@core/helper'
import { useWindow } from '@core/utils'
import { Navbar, useMantineTheme, NavbarProps, Transition } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import MainLink from './MainLink'

const CustomNavbar = defineVFC<
  {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
  } & Omit<NavbarProps, 'children'>
>(({ opened, setOpened, className, ...prop }) => {
  const { colorScheme, colors, breakpoints } = useMantineTheme()
  const isDark = colorScheme === 'dark'
  const isLargeScreen = useWindow('matchMedia')
    ? useMediaQuery(`(min-width: ${breakpoints.sm}px)`)
    : true

  const closeNavBar = () => setOpened(false)
  const { t } = useTranslation()

  return (
    <Transition
      transition="slide-right"
      duration={300}
      timingFunction="ease"
      mounted={isLargeScreen || opened}
    >
      {style => (
        <Navbar
          {...prop}
          hiddenBreakpoint="sm"
          hidden={!opened}
          className={className}
          height="calc(100vh - 70px)"
          style={{
            minHeight: 'calc(100vh - 70px)',
            ...style
          }}
        >
          <MainLink
            icon="bx:home"
            iconColor={'blue'}
            href="/"
            onClick={closeNavBar}
          >
            {t('general.home')}
          </MainLink>
          <MainLink
            icon="akar-icons:circle-check"
            iconColor={'lime'}
            href="/subscription"
            onClick={closeNavBar}
          >
            {t('general.subscription')}
          </MainLink>
          <MainLink
            icon="ant-design:setting-outlined"
            iconColor={'violet'}
            href="/settings"
            onClick={closeNavBar}
          >
            {t('general.setting')}
          </MainLink>
          <Navbar.Section
            mt={'auto'}
            sx={{
              borderTop: `1px solid ${
                isDark ? colors.dark[6] : colors.gray[3]
              }`,
              padding: 4
            }}
          >
            User Info
          </Navbar.Section>
        </Navbar>
      )}
    </Transition>
  )
})

export default CustomNavbar
