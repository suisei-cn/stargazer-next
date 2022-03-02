import { settings } from '@core/setting'
import { randomInt, sleep } from '@core/utils'

// TODO: API

export const updateSetting = async (key: string, enabled: boolean) => {
  await sleep(200)
  // throw new Error('Oops, something went wrong')
}

export const getSetting = async () => {
  return settings.map(g => ({
    ...g,
    settings: g.settings.map(s => {
      const value = randomInt(0, 1) === 1
      return {
        ...s,
        value,
        syncedValue: value
      }
    })
  }))
}
