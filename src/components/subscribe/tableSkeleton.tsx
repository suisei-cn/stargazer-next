import { defineVFC } from '@core/helper'
import { Box, Skeleton } from '@mantine/core'

const SkeletonCell = defineVFC<{ grow: number }>(({ grow, className }) => (
  <Box
    component="td"
    sx={{
      flexGrow: grow,
      paddingLeft: '6px !important',
      paddingRight: '6px !important'
    }}
    className={className}
  >
    <Skeleton height={24} />
  </Box>
))

const SkeletonRow = defineVFC<{ key: number }>(({ key }) => (
  <Box component="tr" key={key} sx={{ display: 'flex' }}>
    <SkeletonCell grow={1} />
    <SkeletonCell grow={4} />
    <SkeletonCell grow={13} />
  </Box>
))

const TableSkeleton = defineVFC(() => {
  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, key) => (
          <SkeletonRow key={key} />
        ))}
    </>
  )
})

export default TableSkeleton
