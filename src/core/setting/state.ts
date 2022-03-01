import { getSetting, updateSetting } from 'api/setting'
import {
  atom,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilCallback
} from 'recoil'

import { useNotifications } from '@mantine/notifications'

import { DataLoadState } from '@core/const'

import { settings } from './const'
import { Setting, SettingGroup, State } from './type'

export const settingState = atom<State>({
  key: 'settingState',
  default: {
    settings,
    loadingState: DataLoadState.Loaded
  },
  effects: [
    ({ setSelf }) => {
      console.log('Loading settings...')
      setSelf(state =>
        state instanceof DefaultValue
          ? state
          : {
              ...state,
              loadingState: DataLoadState.Loading
            }
      )
      getSetting()
        .then(settings => {
          console.log('Settings loaded')
          setSelf(state =>
            state instanceof DefaultValue
              ? state
              : {
                  ...state,
                  settings,
                  loadingState: DataLoadState.Loaded
                }
          )
        })
        .catch(e => {
          console.error(e)
          setSelf(state =>
            state instanceof DefaultValue
              ? state
              : {
                  ...state,
                  loadingState: DataLoadState.Error
                }
          )
        })
    }
  ]
})

export const withLoadingState = selector<DataLoadState>({
  key: 'withLoadingState',
  get: ({ get }) => get(settingState).loadingState
})

export const withSettings = selector<SettingGroup[]>({
  key: 'withSettings',
  get({ get }) {
    return get(settingState).settings
  },
  set: ({ set }, settings) => {
    set(settingState, state =>
      settings instanceof DefaultValue ? settings : { ...state, settings }
    )
  }
})

export const withSettingsMap = selector<Record<string, Setting>>({
  key: 'withSettingsMap',
  get: ({ get }) =>
    Object.fromEntries(
      get(settingState)
        .settings.flatMap(g => g.settings)
        .map(s => [s.key, s])
    )
})

export const withSettingByKey = selectorFamily<Setting | undefined, string>({
  key: 'withSettingByKey',
  get:
    key =>
    ({ get }) => {
      const settings = get(withSettings)
      const setting = settings.flatMap(g => g.settings).find(s => s.key === key)
      return setting
    },
  set:
    key =>
    ({ set, get }, setting) => {
      if (!setting || setting instanceof DefaultValue) return

      const prev = get(withSettingByKey(key))

      if (!prev) {
        console.error(`Setting ${key} not found`)
        return
      }

      set(withSettings, groups =>
        groups.map(group => ({
          ...group,
          settings: group.settings.map(s => (s.key === prev.key ? setting : s))
        }))
      )
    }
})

export const useToggleSetting = () => {
  const { showNotification } = useNotifications()

  return useRecoilCallback(({ snapshot, set }) => async (key: string) => {
    const release = snapshot.retain()
    const setting = await snapshot.getPromise(withSettingByKey(key))

    if (!setting) {
      console.error(`Setting ${key} not found`)
      return
    }

    const newSetting = { ...setting, value: !setting.value }

    set(withSettingByKey(key), newSetting)

    await updateSetting(key, !setting.value)
      .then(() => {
        console.info(`${key} is synced with server (Now ${newSetting.value})`)
        set(withSettingByKey(key), {
          ...newSetting,
          syncedValue: newSetting.value
        })
      })
      .catch(e => {
        console.error(
          `Error updating ${key}, reset to previously synced value (${setting.syncedValue})`
        )

        showNotification({
          message: e.message,
          autoClose: 3000,
          title: `Failed to update setting`,
          color: 'red'
        })
        set(withSettingByKey(key), {
          ...setting,
          value: setting.syncedValue
        })
      })
      .finally(() => release())
  })
}
