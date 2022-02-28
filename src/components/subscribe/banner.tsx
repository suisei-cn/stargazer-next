import { defineVFC } from '@core/helper'

import {
  Box,
  Container,
  Group,
  Space,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core'

import { Icon } from '@iconify/react'
import { useRecoilValue } from 'recoil'
import { withCount } from '@core/subscribe'

const SettingBanner = defineVFC(() => {
  const theme = useMantineTheme()
  const { all, selected, subscribed } = useRecoilValue(withCount)

  return (
    <Box
      sx={theme => ({
        background: theme.colors.gray[0],
        borderBottom: '1px solid #e9ecef',
        padding: '3rem'
      })}
    >
      {/* Second container is the content of banner */}
      <Container size="lg">
        <Title order={1}>Subscription</Title>
        <Text color={theme.colors.gray[6]}>Manage VTBs you subscribed</Text>
        <Space h="lg" />
        <Group sx={{ color: theme.colors.gray[6] }} spacing="xs">
          <Icon icon="ant-design:check-circle-outlined" />
          <Text size="sm" sx={{ width: '6rem' }}>
            Selected:
          </Text>
          {/* TODO: use mono font */}
          <Text weight={700} size="sm" sx={{ color: theme.colors.blue[6] }}>
            {selected} / {all}
          </Text>
        </Group>
        <Group sx={{ color: theme.colors.gray[6] }} spacing="xs">
          <Icon icon="akar-icons:eye" />
          <Text size="sm" sx={{ width: '6rem' }}>
            Subscribed:{' '}
          </Text>
          {/* TODO: Use mono font */}
          <Text weight={700} size="sm" sx={{ color: theme.colors.blue[6] }}>
            {subscribed}
          </Text>
        </Group>
      </Container>
    </Box>
  )
})

export default SettingBanner
