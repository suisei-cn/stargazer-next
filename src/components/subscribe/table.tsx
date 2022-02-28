import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { defineVFC } from '@core/helper'
import {
  AllToggleState,
  SortKey,
  SortOrder,
  withAllToggle,
  withLoading,
  withSearchQuery,
  withSort,
  withSortedAndFilteredVTB,
  withVTB
} from '@core/subscribe'

import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Highlight,
  ScrollArea,
  Table,
  Text,
  useMantineTheme
} from '@mantine/core'
import { Icon } from '@iconify/react'
import { getName } from '@core/utils'
import TableSkeleton from './tableSkeleton'

const EmptyWarn = defineVFC(() => {
  const theme = useMantineTheme()
  return (
    <Box
      component="tr"
      sx={{
        ':hover': {
          backgroundColor: 'transparent !important'
        }
      }}
    >
      <td>
        <Container sx={{ color: theme.colors.dark[3] }}>
          <Center mt={60} mb={40}>
            <Icon icon="ic:outline-sms-failed" width={60} />
          </Center>
          <Center mb={20}>
            <Text>Oops! we cannot find your beloved one, but you can</Text>
          </Center>
          <Center>
            <Button component="a" href="https://github.com/" variant="light">
              Add new VTB
            </Button>
          </Center>
        </Container>
      </td>
    </Box>
  )
})

const SubscribeTable = defineVFC(() => {
  const setVtbs = useSetRecoilState(withVTB)
  const searchQuery = useRecoilValue(withSearchQuery)
  const sortedAndFilteredVtbs = useRecoilValue(withSortedAndFilteredVTB)
  const [sort, setSort] = useRecoilState(withSort)
  const [allToggledState, setAllToggled] = useRecoilState(withAllToggle)

  if (useRecoilValue(withLoading)) return <TableSkeleton />

  const updateSort = (key: SortKey) => {
    if (sort.key === key) {
      setSort(sortState => {
        if (sortState.order === SortOrder.Asc) {
          return {
            order: SortOrder.Desc,
            key: 'none'
          }
        } else {
          return {
            ...sortState,
            order: SortOrder.Asc
          }
        }
      })
    } else {
      setSort({
        key,
        order: SortOrder.Desc
      })
    }
  }

  const toggleSingle = (uuid: string) => {
    setVtbs(vtbs =>
      vtbs.map(vtb =>
        vtb.uuid !== uuid ? vtb : { ...vtb, subscribed: !vtb.subscribed }
      )
    )
  }

  const highlight = searchQuery.split('')

  const headCheckBox =
    allToggledState === AllToggleState.All ? (
      <Checkbox
        checked={true}
        onChange={() => {
          setAllToggled(AllToggleState.None)
        }}
      />
    ) : allToggledState === AllToggleState.None ? (
      <Checkbox
        checked={false}
        onChange={() => {
          setAllToggled(AllToggleState.All)
        }}
      />
    ) : (
      <Checkbox
        checked={false}
        indeterminate
        onChange={() => {
          setAllToggled(AllToggleState.All)
        }}
      />
    )

  const SortKeyButton = defineVFC<{ sortKey: SortKey; display: string }>(
    ({ display, sortKey, className }) => {
      const isSortKey = sort.key === sortKey

      return (
        <Button
          variant="subtle"
          size="xs"
          className={className}
          onClick={() => {
            updateSort(sortKey)
          }}
        >
          <Text weight={isSortKey ? 700 : 400} size="sm">
            {display}
            {isSortKey ? (sort.order === SortOrder.Asc ? ' ▲' : ' ▼') : ''}
          </Text>
        </Button>
      )
    }
  )

  const head = (
    <tr style={{ display: 'flex' }}>
      <th
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          paddingRight: '0.5rem'
        }}
      >
        {headCheckBox}
      </th>

      <th
        style={{
          width: '12rem',
          flexGrow: 1,
          paddingRight: '0 !important',
          paddingLeft: '0 !important'
        }}
      >
        <SortKeyButton sortKey={'name'} display="Name" />
      </th>
      <th
        style={{
          flexGrow: 1,
          paddingRight: '0 !important',
          paddingLeft: '0 !important'
        }}
      >
        <SortKeyButton sortKey={'group'} display="Group" />
      </th>
      <th
        style={{
          width: '12rem',
          flexGrow: 114514,
          paddingRight: '0 !important',
          paddingLeft: '0 !important'
        }}
      ></th>
    </tr>
  )

  const rows =
    sortedAndFilteredVtbs.length === 0 ? (
      <EmptyWarn />
    ) : (
      sortedAndFilteredVtbs.map(vtb => {
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
      })
    )

  return (
    <ScrollArea
      type="scroll"
      scrollHideDelay={200}
      offsetScrollbars
      scrollbarSize={2}
      mt={12}
    >
      <Table horizontalSpacing="xs" highlightOnHover>
        <thead>{head}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
})

export default SubscribeTable
