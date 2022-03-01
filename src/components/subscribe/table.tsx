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

import { Button, Checkbox, ScrollArea, Table, Text } from '@mantine/core'
import TableSkeleton from './tableSkeleton'
import React from 'react'
import {
  TableSearchEmptyWarn,
  TableDataLoadError,
  TableVtbRows
} from './tableComponent'
import { DataLoadState } from '@core/const'

const SubscribeTable = defineVFC(() => {
  const setVtbs = useSetRecoilState(withVTB)
  const searchQuery = useRecoilValue(withSearchQuery)
  const sortedAndFilteredVtbs = useRecoilValue(withSortedAndFilteredVTB)
  const [sort, setSort] = useRecoilState(withSort)
  const [allToggledState, setAllToggled] = useRecoilState(withAllToggle)
  const loadState = useRecoilValue(withLoading)

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
    <tr style={{ display: 'flex', width: '100%' }}>
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

  return (
    <ScrollArea
      type="scroll"
      scrollHideDelay={200}
      offsetScrollbars
      scrollbarSize={2}
      mt={12}
    >
      <Table
        horizontalSpacing="xs"
        highlightOnHover={
          loadState === DataLoadState.Loaded &&
          sortedAndFilteredVtbs.length !== 0
        }
      >
        <thead>{head}</thead>
        <tbody>
          {loadState === DataLoadState.Loading ? (
            <TableSkeleton />
          ) : loadState === DataLoadState.Error ? (
            <TableDataLoadError />
          ) : sortedAndFilteredVtbs.length === 0 ? (
            <TableSearchEmptyWarn />
          ) : (
            <TableVtbRows
              highlight={highlight}
              toggleSingle={toggleSingle}
              vtbs={sortedAndFilteredVtbs}
            />
          )}
        </tbody>
      </Table>
    </ScrollArea>
  )
})

export default SubscribeTable
