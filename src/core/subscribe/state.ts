import Fuse from 'fuse.js'
import { atom, DefaultValue, selector } from 'recoil'

import { AllToggleState, SortOrder, State } from '@core/subscribe'
import { getName } from '@core/utils'

import { SortKey, VTB } from './types'

const getUpdateRecord = (vtbs: VTB[]) =>
  Object.fromEntries(vtbs.map(vtb => [vtb.uuid, vtb.subscribed]))

const loadDefaultState = async (): Promise<State> => {
  // TODO: use real API
  console.log('Loading data')
  const data = await import('@data/vdb.new.json')

  const groups = Object.fromEntries(
    data.groups.map(g => [g.uuid, getName(g.name)])
  )

  const vtbs = data.vtbs.map(vtb => ({
    ...vtb,
    group: vtb.group ? groups[vtb.group] : ''
  }))

  return {
    vtbs,
    loading: false,
    lastUpdated: getUpdateRecord(vtbs),
    searchQuery: '',
    sortByKey: 'none',
    sortOrder: SortOrder.Asc,
    fuse: new Fuse(vtbs, {
      includeScore: true,
      ignoreLocation: true,
      keys: [
        'name.lang.zh',
        'name.lang.en',
        'name.lang.kr',
        'name.lang.jp',
        'group',
        'id'
      ]
    })
  }
}

const subscriptionState = atom<State>({
  key: 'subscriptionState',
  default: {
    vtbs: [],
    loading: true,
    lastUpdated: {},
    searchQuery: '',
    sortByKey: 'none',
    sortOrder: SortOrder.Asc,
    fuse: new Fuse([])
  },
  effects: [
    ({ setSelf }) => {
      loadDefaultState().then(setSelf)
    }
  ]
})

export const withLoading = selector<boolean>({
  key: 'withLoading',
  get: ({ get }) => get(subscriptionState).loading,
  set: ({ set }, loading) => {
    loading instanceof DefaultValue ||
      set(subscriptionState, state => ({ ...state, loading }))
  }
})

export const withResetVtbs = selector({
  key: 'withResetVtbs',
  get: () => {},
  set: ({ set }) => {
    set(subscriptionState, state => ({
      ...state,
      vtbs: state.vtbs.map(vtb => ({
        ...vtb,
        subscribed: state.lastUpdated[vtb.uuid]
      }))
    }))
  }
})

export const withUpdateVtbs = selector<VTB[]>({
  key: 'withUpdateVtbs',
  get: ({ get }) => get(subscriptionState).vtbs,
  set: ({ get, set }, vtbs) => {
    if (!Array.isArray(vtbs)) {
      return
    }
    const state = get(subscriptionState)
    const lastUpdated = getUpdateRecord(vtbs)
    const fuse = new Fuse(vtbs, {})
    set(subscriptionState, {
      ...state,
      lastUpdated,
      fuse,
      vtbs
    })
  }
})

export const withAllToggle = selector<AllToggleState>({
  key: 'withAllToggle',
  get: ({ get }) => {
    const count = get(withSortedAndFilteredVTB).filter(
      vtb => vtb.subscribed
    ).length
    return count === 0
      ? AllToggleState.None
      : count === get(withSortedAndFilteredVTB).length
      ? AllToggleState.All
      : AllToggleState.Partial
  },
  set: ({ set }, newValue) => {
    if (newValue === AllToggleState.All) {
      set(withSortedAndFilteredVTB, state =>
        state.map(vtb => ({ ...vtb, subscribed: true }))
      )
    } else {
      set(withSortedAndFilteredVTB, state =>
        state.map(vtb => ({ ...vtb, subscribed: false }))
      )
    }
  }
})

export const withSearchQuery = selector<string>({
  key: 'withSearch',
  get: ({ get }) => get(subscriptionState).searchQuery,
  set: ({ set }, newValue) => {
    set(subscriptionState, state => ({
      ...state,
      searchQuery: typeof newValue === 'string' ? newValue : ''
    }))
  }
})

export const withVTB = selector<VTB[]>({
  key: 'withVTB',
  get: ({ get }) => get(subscriptionState).vtbs,
  set: ({ set }, newValue) => {
    Array.isArray(newValue) &&
      set(subscriptionState, state => ({
        ...state,
        vtbs: newValue
      }))
  }
})

export const withSortedAndFilteredVTB = selector<VTB[]>({
  key: 'withSortedAndFilteredVTB',
  get: ({ get }) => {
    const state = get(subscriptionState)

    if (state.searchQuery.length !== 0) {
      // Searching, use matched score for sorting, ignore normal sortKeys
      const ids = Object.fromEntries(
        state.fuse.search(state.searchQuery).map(x => [x.item.uuid, x.score])
      )
      console.log(ids)
      return state.vtbs
        .filter(x => x.uuid in ids)
        .sort((a, b) => (ids[a.uuid] ?? 1) - (ids[b.uuid] ?? 1))
    } else {
      // Not Searching, use normal sortKeys
      const vtbs = state.vtbs
      const key = state.sortByKey

      const genKey = (a: VTB, key: Exclude<SortKey, 'none'>) =>
        key === 'name' ? getName(a.name) : a[key] ?? -1

      if (key === 'none') return vtbs
      else if (state.sortOrder === SortOrder.Asc)
        return [...vtbs].sort((a, b) => {
          const aKey = genKey(a, key)
          const bKey = genKey(b, key)
          return aKey > bKey ? 1 : aKey < bKey ? -1 : 0
        })
      else
        return [...vtbs].sort((a, b) => {
          const aKey = genKey(a, key)
          const bKey = genKey(b, key)
          return aKey > bKey ? -1 : aKey < bKey ? 1 : 0
        })
    }
  },
  set: ({ set }, newValue) => {
    Array.isArray(newValue) &&
      set(subscriptionState, state => {
        const ids = getUpdateRecord(newValue)
        return {
          ...state,
          vtbs: state.vtbs.map(vtb => {
            let val = ids[vtb.uuid]
            if (val !== undefined) {
              return {
                ...vtb,
                subscribed: val
              }
            }
            return vtb
          })
        }
      })
  }
})

export const withSort = selector<{ order: SortOrder; key: SortKey }>({
  key: 'withSort',
  get: ({ get }) => {
    const state = get(subscriptionState)
    return {
      order: state.sortOrder,
      key: state.sortByKey
    }
  },
  set: ({ set }, newValue) => {
    'key' in newValue &&
      set(subscriptionState, state => ({
        ...state,
        sortByKey: newValue.key,
        sortOrder: newValue.order
      }))
  }
})

export const withUpdated = selector<boolean>({
  key: 'withUpdated',
  get: ({ get }) => {
    const state = get(subscriptionState)
    const vtbs = getUpdateRecord(state.vtbs)

    return Object.entries(state.lastUpdated).some(
      ([id, subscribed]) => subscribed !== vtbs[id] ?? subscribed
    )
  }
})

export const withCount = selector<{
  all: number
  selected: number
  unselected: number
  subscribed: number
}>({
  key: 'withSelectedCount',
  get: ({ get }) => {
    const state = get(subscriptionState)
    const vtbs = state.vtbs
    const selected = vtbs.filter(vtb => vtb.subscribed).length
    const all = vtbs.length
    const unselected = all - selected
    const subscribed = Object.values(state.lastUpdated).filter(x => x).length
    return {
      all,
      selected,
      unselected,
      subscribed
    }
  }
})

export const withCanSelectFiltered = selector<boolean>({
  key: 'withCanSelectFiltered',
  get: ({ get }) => get(withSearchQuery).length !== 0
})
