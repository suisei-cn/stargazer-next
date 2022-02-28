import { SortOrder } from './consts'
import Fuse from 'fuse.js'

export type SortKey = Exclude<keyof VTB, 'subscribed'> | 'none'

export interface Account {
  id: string
  platform: string
  type: 'official' | 'relay' | string
}

export interface Name {
  lang: Record<string, string | undefined>
  default: string
}

export interface VTB {
  uuid: string
  name: Name
  subscribed: boolean
  group?: string
}

export interface Group {
  uuid: string
  name: Name
}

export interface Meta {
  UUID_NAMESPACE: string
  linkSyntax: Record<string, string>
  timestamp: number
}

export interface RawData {
  vtbs: VTB[]
  groups: Group[]
}

export interface State {
  lastUpdated: Record<string, boolean>
  sortByKey: SortKey
  sortOrder: SortOrder
  searchQuery: string
  loading: boolean
  vtbs: VTB[]
  fuse: Fuse<VTB>
}
