/**
 * 请柬全部文案与数据 —— 换成你自己的信息只需要改这个文件。
 *
 * 有两个版本，用网址参数区分（发给谁就用哪条链接）：
 *   新人发给朋友：https://你的域名/
 *   父母发给他们的朋友：https://你的域名/?from=parents
 *
 * 注意：index.html 里的 title / og 标签是静态的（微信、iMessage 抓不到 JS 渲染结果），
 * 所以那里写的是不带发送人视角的描述。
 */

/** 发送人视角：couple = 新人自己发；parents = 父母发给自己的朋友 */
export type Audience = 'couple' | 'parents'

const groomName = '赵杰'
const brideName = '梁紫艺'

/** 父亲 / 母亲姓名（父母版本用，也会出现在邀请语和署名里） */
const father = '赵壮虎'
const mother = '刘永娟'

export interface Host {
  label: string
  name: string
}

/** 两个版本共用的内容：日期、婚宴、地图、相册、备案等 */
const shared = {
  groom: { avatar: '/photos/groom_avatar.webp', name: groomName, fullName: groomName },
  bride: { avatar: '/photos/bride_avatar.webp', name: brideName, fullName: brideName },

  /** 婚礼时间（倒计时目标） */
  date: '2027-01-01T10:00:00+08:00',
  dateText: '2027年1月1日',
  weekdayText: '星期五',
  lunarText: '农历十一月廿四',

  /** 婚宴 */
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

  /** 页脚备案信息 */
  icp: {
    number: '晋ICP备2026016139号-1',
    href: 'https://beian.miit.gov.cn/',
    /** 个人备案的主办者姓名 */
    owner: '赵杰',
  },
}

/** 随发送人视角变化的文案（以后若要女方父母版：女儿 / 女婿，照抄一份改角色即可） */
const copies = {
  couple: {
    pageTitle: `${groomName} & ${brideName} · 婚礼请柬`,
    /** 新人卡片上的身份 */
    groomRole: '新郎',
    brideRole: '新娘',
    /** 发送人（新人自己发，无需署名） */
    hosts: [] as Host[],
    hostLine: null as string | null,
    heroTagline: '我们结婚啦',
    /** 喜讯 / 引言 */
    announcement: ['愿以余生 相守相伴', '谨备薄酒 恭候亲友'],
    /** 邀请语，一行一句 */
    inviteLines: [
      '我们诚挚地邀请您',
      `见证 ${groomName} 与 ${brideName} 的幸福时刻`,
      '与我们一同分享这份喜悦',
    ],
    countdownPrefix: '距离我们的婚礼',
    countdownDone: '我们已喜结连理 ❦',
    thanks: {
      title: '感谢你们的见证与祝福',
      message: '人生最美好的时刻，有幸与你们一同分享。',
    },
  },
  parents: {
    pageTitle: `${father} · ${mother} 敬邀 · ${groomName}与${brideName}婚礼`,
    /** 父母视角下两位新人分别是「儿子」「儿媳」 */
    groomRole: '儿子',
    brideRole: '儿媳',
    hosts: [
      { label: '父亲', name: father },
      { label: '母亲', name: mother },
    ] as Host[],
    hostLine: `${father} · ${mother} 敬邀`,
    heroTagline: '儿子儿媳 新婚志喜',
    announcement: ['喜结良缘 佳偶天成', '谨备薄酒 恭候亲友'],
    inviteLines: [
      '谨以父母之心邀您',
      `见证儿子 ${groomName} 与 儿媳 ${brideName} 的婚礼`,
      '与我们一同分享这份喜悦',
    ],
    countdownPrefix: '距离孩子们的婚礼',
    countdownDone: '孩子们已喜结连理 ❦',
    thanks: {
      title: '感谢您的祝福与见证',
      message: `儿子${groomName}与儿媳${brideName}的新婚之喜\n承蒙您来同贺。`,
    },
  },
}

/** ?from=parents（也接受 parent / 父母）切到父母版本，其余一律是新人版本 */
function resolveAudience(search: string): Audience {
  const raw = (new URLSearchParams(search).get('from') ?? '').trim().toLowerCase()
  return raw === 'parents' || raw === 'parent' || raw === '父母' ? 'parents' : 'couple'
}

const audience = resolveAudience(typeof window === 'undefined' ? '' : window.location.search)
const copy = copies[audience]

export const invitation = {
  ...shared,
  audience,
  pageTitle: copy.pageTitle,
  groom: { ...shared.groom, role: copy.groomRole },
  bride: { ...shared.bride, role: copy.brideRole },
  hosts: copy.hosts,
  hostLine: copy.hostLine,
  heroTagline: copy.heroTagline,
  announcement: copy.announcement,
  inviteLines: copy.inviteLines,
  countdownPrefix: copy.countdownPrefix,
  countdownDone: copy.countdownDone,
  thanks: copy.thanks,
}

export type Invitation = typeof invitation
