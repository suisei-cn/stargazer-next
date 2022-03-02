import { SettingGroup } from './type'

export const settings: SettingGroup[] = [
  {
    title: 'Bilibili',
    settings: [
      {
        key: 'bilibili.go_live',
        value: false,
        syncedValue: false
      },
      {
        key: 'bilibili.send_dynamic',
        value: false,
        syncedValue: false
      },
      {
        key: 'bilibili.forward_dynamic',
        value: false,
        syncedValue: false
      }
    ]
  },
  {
    title: 'Youtube',
    settings: [
      {
        key: 'youtube.go_live',
        value: false,
        syncedValue: false
      },
      {
        key: 'youtube.schedule_broadcast',
        value: false,
        syncedValue: false
      },
      {
        key: 'youtube.30_min_reminder',
        value: false,
        syncedValue: false
      },
      {
        key: 'youtube.new_video',
        value: false,
        syncedValue: false
      }
    ]
  },
  {
    title: 'Twitter',
    settings: [
      {
        key: 'twitter.tweet',
        value: false,
        syncedValue: false
      },
      {
        key: 'twitter.retweet',
        value: false,
        syncedValue: false
      }
    ]
  }
]
