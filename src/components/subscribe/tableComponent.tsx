import React from 'react'

import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Highlight,
  Text
} from '@mantine/core'

import { defineVFC } from '@core/helper'
import { VTB } from '@core/subscribe'
import { getName } from '@core/utils'

export const TableSearchEmptyWarn = defineVFC(
  () => (
    <Box component="tr">
      <td>
        <Container sx={theme => ({ color: theme.colors.dark[3] })}>
          <Center mt={60} mb={40}>
            <Icon icon="ic:outline-sms-failed" width={60} />
          </Center>
          <Center mb={20}>
            <Text>Oops! We cannot find your beloved one, but you can</Text>
          </Center>
          <Center>
            <Button component="a" href="https://github.com/" variant="light">
              Add new VTB
            </Button>
          </Center>
        </Container>
      </td>
    </Box>
  ),
  { memo: true }
)

export const TableDataLoadError = defineVFC(
  () => (
    <Box component="tr">
      <td>
        <Container sx={theme => ({ color: theme.colors.dark[3] })}>
          <Center mt={60} mb={40}>
            <Icon icon="carbon:data-error" width={60} />
          </Center>
          <Center mb={20}>
            <Text>Oops! There&apos;s some problem loading the data</Text>
          </Center>
          <Center>
            <Button
              component="a"
              href="https://github.com/suisei-cn/stargazer-next/issues/new"
              variant="light"
            >
              Report the issue
            </Button>
          </Center>
        </Container>
      </td>
    </Box>
  ),
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
            <td style={{ flexGrow: 1, paddingTop: '0.6rem!important' }}>
              <Checkbox checked={subscribed} onChange={() => {}} size="sm" />
            </td>
            <td
              style={{
                flexGrow: 1,
                width: '12rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <Highlight highlight={highlight} size="sm">
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
              <Highlight highlight={highlight} size="sm" color={'gray'}>
                {group ?? ''}
              </Highlight>
            </td>
            <td
              style={{
                flexGrow: 114514
              }}
            ></td>
          </tr>
        )
      })}
    </>
  ),
  { memo: true }
)
