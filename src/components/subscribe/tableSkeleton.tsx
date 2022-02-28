import { defineVFC } from '@core/helper'
import { Box, Skeleton, Table } from '@mantine/core'

const SkeletonCell = defineVFC<{ width?: string }>(({ width, className }) => (
  <Box
    component="td"
    sx={{
      width,
      paddingLeft: '6px !important',
      paddingRight: '6px !important'
    }}
    className={className}
  >
    <Skeleton height={24} />
  </Box>
))

const TableSkeleton = defineVFC(() => {
  const row = (
    <Box component="tr">
      <SkeletonCell width="2rem" />
      <SkeletonCell width="5rem" />
      <SkeletonCell width="15rem" />
    </Box>
  )
  return (
    <Box my={12}>
      <Table>
        <tbody>{Array(10).fill(row)}</tbody>
      </Table>
    </Box>
  )
})

export default TableSkeleton
