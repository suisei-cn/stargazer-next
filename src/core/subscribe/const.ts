import { DataLoadState } from '@core/const'
import Fuse from 'fuse.js'
import { State } from './type'

export enum SortOrder {
  Asc,
  Desc
}

export enum AllToggleState {
  All,
  None,
  Partial
}

export const defaultState: State = {
  vtbs: [],
  loadingState: DataLoadState.Loading,
  lastUpdated: {},
  searchQuery: '',
  sortByKey: 'none',
  sortOrder: SortOrder.Asc,
  fuse: new Fuse([])
}
