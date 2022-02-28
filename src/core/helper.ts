import type { VFC } from 'react'

export interface baseProp {
  className?: string
}

export interface childProp {
  children: React.ReactNode
}

type Empty = Record<string, never>

export const defineVFC =
  <P = Empty>(comp: VFC<P & Required<baseProp>>) =>
  (prop: P & baseProp) => {
    const className = prop.className ?? ''
    return comp({ ...prop, className })
  }

export const defineVFCWithChild = <P = Empty>(
  comp: VFC<childProp & P & Required<baseProp>>
) => defineVFC<childProp & P>(comp)

export const definePage = <P = baseProp>(comp: VFC<baseProp & P>) => comp
