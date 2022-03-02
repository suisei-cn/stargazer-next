import { defineLang } from './en'

const zh = defineLang({
  translation: {
    'general.home': '首页',
    'general.subscription': '订阅',
    'general.setting': '设置',
    'general.report_issue': '报告问题',
    'home.banner.description': '欢迎回来， {{user}}！',
    'subscription.banner.description': '管理已订阅的 VTB',
    'subscription.banner.info.selected': '已选',
    'subscription.banner.info.subscribed': '已订阅',
    'subscription.table.head.name': '姓名',
    'subscription.table.head.group': '团体',
    'subscription.table.warn.failed_to_load_data.text': '哦豁，加载数据失败了',
    'subscription.table.warn.unable_to_find.text':
      '哦豁，找不到你最爱的TA，不过没关系！你可以：',
    'subscription.table.warn.unable_to_find.button': '添加新的 VTB',
    'setting.banner.title': '设置',
    'setting.banner.description': '通知及更多',
    'setting.options.notification.title': '通知',
    'setting.warn.failed_to_update_setting': '更新设置失败',
    'setting.options.notification.bilibili.go_live': '直播开始',
    'setting.options.notification.bilibili.send_dynamic': '发送动态',
    'setting.options.notification.bilibili.forward_dynamic': '转发动态',
    'setting.options.notification.youtube.go_live': '直播开始',
    'setting.options.notification.youtube.schedule_broadcast': '预定直播',
    'setting.options.notification.youtube.30_min_reminder': '距直播30分钟提醒',
    'setting.options.notification.youtube.new_video': '新视频',
    'setting.options.notification.twitter.tweet': '发送推文',
    'setting.options.notification.twitter.retweet': '转发推文'
  }
})

export default zh
