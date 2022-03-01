import { SettingGroup } from './type'

export const settings: SettingGroup[] = [
  {
    title: 'Bilibili',
    settings: [
      {
        key: 'bilibili::go_live',
        value: false,
        text: 'Live started',
        syncedValue: false
      },
      {
        key: 'bilibili::send_dynamic',
        value: false,
        text: 'Dynamic sent',
        syncedValue: false
      },
      {
        key: 'bilibili::forward_dynamic',
        value: false,
        text: 'Dynamic forwarded',
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
        text: 'Live started',
        syncedValue: false
      },
      {
        key: 'youtube::schedule_broadcast',
        value: false,
        text: 'Broadcast scheduled',
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
        text: 'Video uploaded',
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
        text: 'Tweeted',
        syncedValue: false
      },
      {
        key: 'twitter::retweet',
        value: false,
        text: 'Retweeted',
        syncedValue: false
      }
    ]
  }
]
