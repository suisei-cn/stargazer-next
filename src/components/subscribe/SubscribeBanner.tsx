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
import PageBanner from '@comps/PageBanner'
import { useTranslation } from 'react-i18next'

const SubscribeBanner = defineVFC(() => {
  const theme = useMantineTheme()
  const { all, selected, subscribed } = useRecoilValue(withCount)
  const { t } = useTranslation()

  return (
    <PageBanner
      title={t('general.subscription')}
      description={t('subscription.banner.description')}
    >
      <Group sx={{ color: theme.colors.gray[6] }} spacing="xs">
        <Icon icon="ant-design:check-circle-outlined" />
        <Text size="sm" sx={{ width: '6rem' }}>
          {t('subscription.banner.info.selected')}:
        </Text>
        {/* TODO: use mono font */}
        <Text weight={700} size="sm" sx={{ color: theme.colors.blue[6] }}>
          {selected} / {all}
        </Text>
      </Group>
      <Group sx={{ color: theme.colors.gray[6] }} spacing="xs">
        <Icon icon="akar-icons:eye" />
        <Text size="sm" sx={{ width: '6rem' }}>
          {t('subscription.banner.info.subscribed')}:
        </Text>
        {/* TODO: Use mono font */}
        <Text weight={700} size="sm" sx={{ color: theme.colors.blue[6] }}>
          {subscribed}
        </Text>
      </Group>
    </PageBanner>
  )
})

export default SubscribeBanner
