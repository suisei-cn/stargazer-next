const en = {
  translation: {
    'general.home': 'Home',
    'general.setting': 'Settings',
    'general.subscription': 'Subscriptions',
    'general.report_issue': 'Report an issue',
    'home.banner.description': 'Hi, {{user}}!',
    'subscription.banner.description': 'Manage VTBs you subscribed',
    'subscription.banner.info.selected': 'Selected',
    'subscription.banner.info.subscribed': 'Subscribed',
    'subscription.table.head.name': 'Name',
    'subscription.table.head.group': 'Group',
    'subscription.table.warn.unable_to_find.text':
      "Oops! We cannot find your beloved one, but don't worry! You can:",
    'subscription.table.warn.unable_to_find.button': 'Add new VTB',
    'subscription.table.warn.failed_to_load_data.text':
      "Oops! There' some problem loading the data",
    'setting.banner.title': 'Settings',
    'setting.banner.description': 'Notification and more',
    'setting.warn.failed_to_update_setting': 'Failed to update setting',
    'setting.options.notification.title': 'Notification',
    'setting.options.notification.bilibili.go_live': 'Live started',
    'setting.options.notification.bilibili.send_dynamic': 'Dynamic sent',
    'setting.options.notification.bilibili.forward_dynamic':
      'Dynamic forwarded',
    'setting.options.notification.youtube.go_live': 'Live started',
    'setting.options.notification.youtube.schedule_broadcast':
      'Broadcast scheduled',
    'setting.options.notification.youtube.30_min_reminder':
      '30 minutes before broadcast',
    'setting.options.notification.youtube.new_video': 'Video uploaded',
    'setting.options.notification.twitter.tweet': 'Tweeted',
    'setting.options.notification.twitter.retweet': 'Retweeted'
  }
}

export type EN = typeof en

export type Lang = { [k in keyof EN]: EN[k] }

export const defineLang = (lang: Lang) => lang

export default en
