import { defineVFCWithChild } from '@core/helper'
import { useDarkMode } from '@core/utils'
import { Icon } from '@iconify/react'
import {
  ActionIcon,
  Box,
  Button,
  CSSObject,
  MantineColor,
  MantineTheme,
  Navbar,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

const useButtonColor = (active: boolean) => {
  const theme = useMantineTheme()

  let dark = theme.colorScheme === 'dark'
  let colors = theme.colors
  return dark
    ? active
      ? [colors.gray[1], colors.gray[8]]
      : [colors.gray[5], '']
    : active
    ? [colors.gray[9], colors.gray[2]]
    : [colors.gray[6], '']
}

const MainLink = defineVFCWithChild<{
  href: string
  icon: string
  onClick?: () => void
}>(({ icon, children, href, className, onClick }) => {
  const [color, bg] = useButtonColor(useRouter().pathname === href)

  return (
    <Navbar.Section className={className} onClick={onClick}>
      <Link passHref href={href}>
        <UnstyledButton
          color={'gray'}
          my={4}
          sx={{
            color,
            background: bg,
            borderRadius: 9,
            // ...(active ? activeBorder : {}),
            display: 'flex',
            padding: '0.4rem 0.7rem',
            width: '100%',
            fontSize: '0.9rem'
          }}
        >
          <Icon
            icon={icon}
            width={18}
            style={{ color, margin: '0.4rem 1rem 0.4rem 0.4rem' }}
          />
          <Box my={'auto'}>{children}</Box>
        </UnstyledButton>
      </Link>
    </Navbar.Section>
  )
})

export default MainLink
