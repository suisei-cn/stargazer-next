import { defineVFC } from '@core/helper'

import {
  Burger,
  Header,
  HeaderProps,
  MediaQuery,
  Text,
  useMantineTheme
} from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'

const CustomHeader = defineVFC<
  {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
  } & Omit<HeaderProps, 'children'>
>(({ opened, setOpened, ...prop }) => {
  const theme = useMantineTheme()

  return (
    <Header {...prop} padding="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened(o => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text size='xl'>Stargazer Reborn</Text>
      </div>
    </Header>
  )
})

export default CustomHeader
