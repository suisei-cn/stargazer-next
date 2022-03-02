import { defineVFC } from '@core/helper'
import { useDarkMode } from '@core/utils'
import {
  Box,
  Container,
  MediaQuery,
  Space,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core'

const PageBanner = defineVFC<{
  title: string
  description?: string
  children?: React.ReactNode
}>(({ children, className, title, description }) => {
  const theme = useMantineTheme()
  const isDark = useDarkMode()

  const inner = (
    <>
      <Title order={1}>{title}</Title>
      {description && (
        <Text color={isDark ? theme.colors.gray[4] : theme.colors.gray[6]}>
          {description}
        </Text>
      )}
      {children && (
        <>
          <Space h="lg" />
          {children}
        </>
      )}
    </>
  )
  return (
    <Box
      className={className}
      sx={({ colors }) => ({
        background: isDark ? colors.dark[7] : colors.gray[0],
        borderBottom: `1px solid ${isDark ? colors.dark[5] : colors.gray[2]}`,
        padding: '3rem'
      })}
    >
      <MediaQuery styles={{ display: 'none' }} smallerThan={'sm'}>
        <Container size="lg" padding="xl">
          {inner}
        </Container>
      </MediaQuery>
      <MediaQuery styles={{ display: 'none' }} largerThan={'sm'}>
        <Container size="md" padding={0}>
          {inner}
        </Container>
      </MediaQuery>
    </Box>
  )
})

export default PageBanner
