import { defineVFC } from '@core/helper'
import {
  Box,
  Container,
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
  return (
    <Box
      className={className}
      sx={theme => ({
        background: theme.colors.gray[0],
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        padding: '3rem'
      })}
    >
      <Container size="lg">
        <Title order={1}>{title}</Title>
        {description && <Text color={theme.colors.gray[6]}>{description}</Text>}
        {children && (
          <>
            <Space h="lg" />
            {children}
          </>
        )}
      </Container>
    </Box>
  )
})

export default PageBanner
