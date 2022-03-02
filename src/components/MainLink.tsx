import { defineVFCWithChild } from '@core/helper'
import { useDarkMode } from '@core/utils'
import { Icon } from '@iconify/react'
import {
  Button,
  CSSObject,
  MantineColor,
  Navbar,
  ThemeIcon,
  useMantineTheme
} from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MainLink = defineVFCWithChild<{
  href: string
  icon: string
  iconColor?: MantineColor
  onClick?: () => void
}>(({ icon, iconColor, children, href, className, onClick }) => {
  const iconColorDetermined = iconColor ?? 'blue'
  const router = useRouter()
  const theme = useMantineTheme()
  const isDark = theme.colorScheme === 'dark'
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
            color: isDark ? theme.colors.gray[3] : theme.colors.gray[7],
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

export default MainLink
