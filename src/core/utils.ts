import { useMantineColorScheme } from '@mantine/core'
import { Name } from './subscribe'
import i18n from 'i18n'

export const regexIndexOf = (
  string: string,
  regex: RegExp,
  startpos?: number
) => {
  const pos = startpos === undefined ? 0 : startpos + 1
  const index = string.slice(pos).search(regex)
  return index >= 0 ? index + pos : index
}

export const allIndexOf = (string: string, regex: RegExp) => {
  let pos: number | undefined = undefined
  const ret: number[] = []
  do {
    pos = regexIndexOf(string, regex, pos)
    if (pos >= 0) {
      ret.push(pos)
    } else {
      break
    }
  } while (true)
  return ret
}

// TODO: i18n
export const getName = (name: Name) => {
  const ret = name.lang[i18n.language] ?? name.lang[name.default]
  if (!ret) throw Error(`Bad name: ${JSON.stringify(name)}`)
  return ret
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const randomInt = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1))

export const useDarkMode = () => useMantineColorScheme().colorScheme === 'dark'
