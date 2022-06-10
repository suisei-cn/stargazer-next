import { defineVFC } from '@core/helper'
import { useWindow } from '@core/utils'
import { Navbar, NavbarProps, Transition, useMantineTheme } from '@mantine/core'
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
      transition='slide-right'
      duration={300}
      timingFunction='ease'
      mounted={isLargeScreen || opened}
    >
      {style => (
        <Navbar
          {...prop}
          hiddenBreakpoint='sm'
          hidden={!opened}
          className={className}
          height='calc(100vh - 70px)'
          sx={{
            minHeight: 'calc(100vh - 70px)',
            padding: 12,
            ...style
          }}
        >
          <MainLink icon='bx:home' href='/' onClick={closeNavBar}>
            {t('general.home')}
          </MainLink>
          <MainLink
            icon='akar-icons:circle-check'
            href='/subscription'
            onClick={closeNavBar}
          >
            {t('general.subscription')}
          </MainLink>
          <MainLink
            icon='ant-design:setting-outlined'
            href='/settings'
            onClick={closeNavBar}
          >
            {t('general.setting')}
          </MainLink>
          {
            /* <MainLink
            icon="ant-design:setting-outlined"
            href="/admin"
            onClick={closeNavBar}
          >
            {t('general.admin')}
          </MainLink> */
          }
          <Navbar.Section
            mt={'auto'}
            sx={{
              borderTop: `1px solid ${isDark ? colors.dark[6] : colors.gray[3]}`,
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
