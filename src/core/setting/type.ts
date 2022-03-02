import { DataLoadState } from '@core/const'

export interface Setting {
  key: string
  // Value being changed immediately after user interaction, may not sync with server
  value: boolean
  // Value being set when server returns
  syncedValue: boolean
}

export interface SettingGroup {
  title: string
  settings: Setting[]
}

export interface State {
  settings: SettingGroup[]
  loadingState: DataLoadState
}
