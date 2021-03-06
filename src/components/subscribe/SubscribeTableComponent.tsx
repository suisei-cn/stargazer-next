import React from 'react'

import { Icon } from '@iconify/react'
import { Box, Button, Center, Checkbox, Container, Highlight, Text } from '@mantine/core'

import { defineVFC } from '@core/helper'
import { VTB } from '@core/subscribe'
import { getName } from '@core/utils'
import { useTranslation } from 'react-i18next'

export const TableSearchEmptyWarn = defineVFC(
  () => {
    const { t } = useTranslation()
    return (
      <Box component='tr'>
        <td>
          <Container sx={theme => ({ color: theme.colors.dark[3] })}>
            <Center mt={60} mb={40}>
              <Icon icon='ic:outline-sms-failed' width={60} />
            </Center>
            <Center mb={20}>
              <Text>{t('subscription.table.warn.unable_to_find.text')}</Text>
            </Center>
            <Center>
              <Button component='a' href='https://github.com/' variant='light'>
                {t('subscription.table.warn.unable_to_find.button')}
              </Button>
            </Center>
          </Container>
        </td>
      </Box>
    )
  },
  { memo: true }
)

export const TableDataLoadFailureWarn = defineVFC(
  () => {
    const { t } = useTranslation()
    return (
      <Box component='tr'>
        <td>
          <Container sx={theme => ({ color: theme.colors.dark[3] })}>
            <Center mt={60} mb={40}>
              <Icon icon='carbon:data-error' width={60} />
            </Center>
            <Center mb={20}>
              <Text>
                {t('subscription.table.warn.failed_to_load_data.text')}
              </Text>
            </Center>
            <Center>
              <Button
                component='a'
                href='https://github.com/suisei-cn/stargazer-next/issues/new'
                variant='light'
              >
                {t('general.report_issue')}
              </Button>
            </Center>
          </Container>
        </td>
      </Box>
    )
  },
  { memo: true }
)

export const TableVtbRows = defineVFC<{
  vtbs: VTB[]
  toggleSingle: (uuid: string) => void
  highlight: string[]
}>(
  ({ vtbs, toggleSingle, highlight }) => (
    <>
      {vtbs.map(vtb => {
        const { uuid, name, subscribed, group } = vtb
        return (
          <tr
            key={uuid}
            style={{ display: 'flex', cursor: 'pointer' }}
            onClick={() => toggleSingle(uuid)}
          >
            <td style={{ paddingTop: '0.6rem!important' }}>
              <Checkbox checked={subscribed} onChange={() => {}} size='sm' />
            </td>
            <td
              style={{
                flexGrow: 1,
                width: '12rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <Highlight highlight={highlight} size='sm'>
                {getName(name)}
              </Highlight>
            </td>
            <td
              style={{
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <Highlight highlight={highlight} size='sm' color={'gray'}>
                {group ?? ''}
              </Highlight>
            </td>
            <td
              style={{
                flexGrow: 114514
              }}
            >
            </td>
          </tr>
        )
      })}
    </>
  ),
  { memo: true }
)
