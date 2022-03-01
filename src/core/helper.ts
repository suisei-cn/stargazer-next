import type { VFC } from 'react'
import React from 'react'

export interface baseProp {
  className?: string
}

export interface childProp {
  children: React.ReactNode
}

export interface DefineConfig {
  memo?: boolean
}

type Empty = Record<string, never>

export const defineVFC = <P = Empty>(
  comp: VFC<P & Required<baseProp>>,
  config?: DefineConfig
) => {
  const ele = (prop: P & baseProp) => {
    const className = prop.className ?? ''
    return comp({ ...prop, className })
  }
  return config?.memo ? React.memo(ele) : ele
}

export const defineVFCWithChild = <P = Empty>(
  comp: VFC<childProp & P & Required<baseProp>>
) => defineVFC<childProp & P>(comp)

export const definePage = <P = baseProp>(comp: VFC<baseProp & P>) => comp
