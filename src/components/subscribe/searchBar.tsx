import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Icon } from '@iconify/react'
import {
  ActionIcon,
  Group,
  TextInput,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core'

import { defineVFC } from '@core/helper'
import { withResetVtbs, withSearchQuery, withUpdated } from '@core/subscribe'

const SubscribeSearchBar = defineVFC(() => {
  const disabled = !useRecoilValue(withUpdated)
  const reset = useSetRecoilState(withResetVtbs)
  const theme = useMantineTheme()
  const [searchQuery, setSearchQuery] = useRecoilState(withSearchQuery)

  return (
    <Group sx={{ display: 'flex', padding: '0 0.5rem' }} spacing="sm">
      <ActionIcon
        sx={{ flexGrow: 1 }}
        size="lg"
        color="blue"
        variant="outline"
        disabled={disabled}
      >
        <Icon icon="cil:save" />
      </ActionIcon>

      <ActionIcon
        sx={{ flexGrow: 1 }}
        size="lg"
        color="yellow"
        variant="outline"
        disabled={disabled}
        onClick={() => {
          reset()
        }}
      >
        <Icon icon="icon-park-outline:clear" />
      </ActionIcon>

      <TextInput
        sx={{ flexGrow: 114514 }}
        placeholder="Search"
        icon={<Icon icon="codicon:search" />}
        value={searchQuery}
        rightSection={
          <UnstyledButton
            onClick={() => setSearchQuery('')}
            color={theme.colors.dark[0]}
            sx={{ display: searchQuery.length === 0 ? 'none' : 'inherit' }}
          >
            <Icon icon="akar-icons:cross" width={12} />
          </UnstyledButton>
        }
        onChange={e => setSearchQuery(e.currentTarget.value)}
      />
    </Group>
  )
})

export default SubscribeSearchBar
