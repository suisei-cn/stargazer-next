import { SettingGroup } from './type'

export const settings: SettingGroup[] = [
  {
    title: 'Bilibili',
    settings: [
      {
        key: 'bilibili::go_live',
        value: false,
        text: 'Go live',
        syncedValue: false
      },
      {
        key: 'bilibili::send_dynamic',
        value: false,
        text: 'Send dynamic',
        syncedValue: false
      },
      {
        key: 'bilibili::forward_dynamic',
        value: false,
        text: 'Forward dynamic',
        syncedValue: false
      }
    ]
  },
  {
    title: 'Youtube',
    settings: [
      {
        key: 'youtube::go_live',
        value: false,
        text: 'Go live',
        syncedValue: false
      },
      {
        key: 'youtube::schedule_broadcast',
        value: false,
        text: 'Scheduled a broadcast',
        syncedValue: false
      },
      {
        key: 'youtube::30_min_reminder',
        value: false,
        text: '30 minutes before broadcast',
        syncedValue: false
      },
      {
        key: 'youtube::new_video',
        value: false,
        text: 'New video',
        syncedValue: false
      }
    ]
  },
  {
    title: 'Twitter',
    settings: [
      {
        key: 'twitter::tweet',
        value: false,
        text: 'Tweet',
        syncedValue: false
      },
      {
        key: 'twitter::retweet',
        value: false,
        text: 'Retweet',
        syncedValue: false
      }
    ]
  }
]
