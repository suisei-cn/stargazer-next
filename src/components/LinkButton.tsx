import { defineVFC } from '@core/helper'
import { Icon } from '@iconify/react'
import { ActionIcon, Button } from '@mantine/core'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

const LinkButton = defineVFC<{
  icon: string
  href: string
  text?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}>(({ href, text, icon, className, onClick }) => {
  const iconNode = <Icon icon={icon} />
  return (
    <Link passHref href={href}>
      {text ? (
        <Button
          variant="light"
          rightIcon={iconNode}
          component="a"
          className={className}
          onClick={onClick}
        >
          {text}
        </Button>
      ) : (
        <ActionIcon
          component="a"
          variant="light"
          size="lg"
          color="blue"
          className={className}
          onClick={onClick}
        >
          {iconNode}
        </ActionIcon>
      )}
    </Link>
  )
})

export default LinkButton
