/**
 * 请柬全部文案与数据 —— 换成你自己的信息只需要改这个文件。
 */

export const invitation = {
  groom: {
    name: '赵杰',
    fullName: '赵杰',
    father: '',
    mother: '',
  },
  bride: {
    name: '梁紫艺',
    fullName: '梁紫艺',
    father: '',
    mother: '',
  },

  /** 婚礼时间（倒计时目标） */
  date: '2027-01-01T10:00:00+08:00',
  dateText: '2027年1月1日',
  weekdayText: '星期五',
  lunarText: '农历十一月廿四', 

  /** 喜讯 / 引言 */
  announcement: ['愿以余生 相守相伴', '谨备薄酒 恭候亲友'],

  /** 典礼与婚宴 */
  ceremony: {
    title: '婚礼仪式',
    time: '上午 11:00',
    venue: '山西省太原清徐县清雅苑(二部)',
    address: '山西省太原市清徐县',
  },
  banquet: {
    title: '喜宴',
    reception: '迎宾 9:30',
    time: '中午 12:00',
    venue: '山西省太原清徐县清雅苑(二部)',
    address: '山西省太原市清徐县',
  },

  /**
   * 高德地图
   * key / securityCode：到 https://lbs.amap.com/ 申请「Web端(JS API)」类型密钥后填入
   * 未填 key 时不显示内嵌地图，只显示「打开高德地图」跳转按钮
   */
  amap: {
    key: '440e63bedf68242c8b1a0b6e478b7d15',
    securityCode: 'a7075e060a11840ff97233c2dd537a3a',
    keyword: '山西省太原清徐县清雅苑(二部)',
    city: '太原',
  },

  /** 相册：照片放在 public/photos/ */
  gallery: Array.from({ length: 12 }, (_, i) => `/photos/section_${i + 1}.webp`),

  /** 背景音乐：把 mp3 放到 public/ 后填路径，例如 '/music.mp3'，留空则不显示音乐按钮 */
  musicUrl: '/audio/background.mp3',

  /** 感谢词 */
  thanks: {
    title: '感谢你们的见证与祝福',
    message: '人生最美好的时刻，有幸与你们一同分享。',
  },
}

export type Invitation = typeof invitation
