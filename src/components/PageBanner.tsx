import { defineVFC } from '@core/helper'
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
  const inner = (
    <>
      <Title order={1}>{title}</Title>
      {description && <Text color={theme.colors.gray[6]}>{description}</Text>}
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
      sx={theme => ({
        background: theme.colors.gray[0],
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
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
