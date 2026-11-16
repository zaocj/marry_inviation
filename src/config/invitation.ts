/**
 * 请柬全部文案与数据 —— 换成你自己的信息只需要改这个文件。
 *
 * 三个版本，用网址路径区分（发给谁就用哪条链接）：
 *   新人版：https://你的域名/
 *   男方父母版：https://你的域名/groom-parents
 *   女方父母版：https://你的域名/bride-parents
 *   根路径或其他路径：一律展示原来的新人版，不再通过查询参数切换版本。
 *
 * 静态分享：src/config/share.ts 从这里读取各版本资料，Vite 为每个入口直接生成
 * 独立的 title / description / og 标签，不依赖浏览器执行 React。
 */

/** 发送人视角：新人、男方父母、女方父母。 */
export type Audience = 'couple' | 'groom-parents' | 'bride-parents'
export type ParentAudience = Exclude<Audience, 'couple'>

const groomName = '赵杰'
const brideName = '梁紫艺'

export interface Host {
  label: string
  name: string
}

/** 三个版本共用的默认内容：日期、婚宴、地图、相册、备案等 */
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

/**
 * 父母版独立配置：双方姓名、称呼、婚宴时间及地图都可分别维护。
 * 女方版本仅以「女儿 / 女婿」邀请，不展示父母姓名或父母署名。
 * 若女方另办婚宴，在 bride-parents 的 event 内修改时间、地点与 amap.keyword。
 */
interface ParentFamily {
  father: string
  mother: string
  familyLabel: string
  fallbackHost: string
  envelopeRoles: string
  groomRole: string
  brideRole: string
  event: Pick<typeof shared, 'date' | 'dateText' | 'weekdayText' | 'lunarText' | 'banquet' | 'amap'>
}

export const parentFamilies: Record<ParentAudience, ParentFamily> = {
  'groom-parents': {
    father: '赵壮虎',
    mother: '刘永娟',
    familyLabel: '赵府',
    fallbackHost: '新郎父母',
    envelopeRoles: '儿子 · 儿媳',
    groomRole: '儿子',
    brideRole: '儿媳',
    event: {
      date: shared.date,
      dateText: shared.dateText,
      weekdayText: shared.weekdayText,
      lunarText: shared.lunarText,
      banquet: { ...shared.banquet },
      amap: { ...shared.amap },
    },
  },
  'bride-parents': {
    father: '',
    mother: '',
    familyLabel: '梁府',
    fallbackHost: '',
    envelopeRoles: '女儿 · 女婿',
    groomRole: '女婿',
    brideRole: '女儿',
    event: {
      date: shared.date,
      dateText: shared.dateText,
      weekdayText: shared.weekdayText,
      lunarText: shared.lunarText,
      banquet: { ...shared.banquet },
      amap: { ...shared.amap },
    },
  },
}

/** 新人版原有文案保持不变。 */
const coupleCopy = {
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
  }

/** 按路径识别父母版，兼容目录入口末尾的斜杠，其余路径使用新人版。 */
export function resolveAudience(pathname: string): Audience {
  const path = pathname.replace(/\/+$/, '')
  if (path === '/groom-parents') return 'groom-parents'
  if (path === '/bride-parents') return 'bride-parents'
  return 'couple'
}

/** 纯配置解析函数，便于验证路径及以后扩展独立页面。 */
export function getInvitation(pathname: string) {
  const audience = resolveAudience(pathname)
  const family = audience === 'couple' ? null : parentFamilies[audience]
  const brideFirst = audience === 'bride-parents'
  const hosts: Host[] = family && !brideFirst
    ? [
        { label: '父亲', name: family.father },
        { label: '母亲', name: family.mother },
      ].filter((host) => Boolean(host.name.trim()))
    : []
  const hostNames = hosts.map((host) => host.name).join(' · ')
  const hostLine = family && !brideFirst ? `${hostNames || family.fallbackHost} 敬邀` : null
  const childrenLine = family
    ? brideFirst
      ? `女儿 ${brideName} 与 女婿 ${groomName}`
      : `儿子 ${groomName} 与 儿媳 ${brideName}`
    : ''
  const copy = family
    ? {
        pageTitle: brideFirst
          ? `女儿${brideName}与女婿${groomName} · 婚礼请柬`
          : `${hostLine} · ${groomName}与${brideName}婚礼`,
        groomRole: family.groomRole,
        brideRole: family.brideRole,
        hosts,
        hostLine,
        heroTagline: brideFirst ? '女儿女婿 新婚志喜' : '儿子儿媳 新婚志喜',
        announcement: ['吾家有喜 喜结良缘', '谨备薄酒 恭候亲友'],
        inviteLines: [brideFirst ? '诚邀您拨冗莅临' : '谨以父母之心邀您', `见证${childrenLine}的婚礼`, '与我们一同分享这份喜悦'],
        countdownPrefix: '距离孩子们的婚礼',
        countdownDone: '孩子们已喜结连理 ❦',
        thanks: {
          title: '感谢您的祝福与见证',
          message: `${childrenLine}的新婚之喜\n承蒙您来同贺。`,
        },
      }
    : coupleCopy

  return {
    ...shared,
    ...(family?.event ?? {}),
    audience,
    familyLabel: family?.familyLabel ?? '',
    envelopeRoles: family?.envelopeRoles ?? '',
    brideFirst,
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
}

export const invitation = getInvitation(typeof window === 'undefined' ? '/' : window.location.pathname)

export type Invitation = typeof invitation
