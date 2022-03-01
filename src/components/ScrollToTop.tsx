import { defineVFC } from '@core/helper'
import { Icon } from '@iconify/react'
import { ActionIcon, Affix, Transition } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'

const ScrollToTop = defineVFC(() => {
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {transitionStyles => (
          <ActionIcon
            size={48}
            radius={6}
            color={'blue'}
            variant="light"
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            <Icon icon="bi:arrow-bar-up" width={24} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  )
})

export default ScrollToTop
