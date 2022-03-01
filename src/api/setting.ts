import { settings } from '@core/setting'
import { randomInt, sleep } from '@core/utils'

export const updateSetting = async (key: string, enabled: boolean) => {
  await sleep(1000)
  throw Error("Can't update setting")
}

export const getSetting = async () => {
  await sleep(1000)

  return settings.map(g => ({
    ...g,
    settings: g.settings.map(s => ({
      ...s,
      value: true,
      syncedValue: true
    }))
  }))
}
