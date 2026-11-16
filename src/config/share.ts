import { getInvitation, type Audience } from './invitation.ts'

/** 静态分享配置：图片地址必须是能被外部直接访问的完整 HTTPS 地址。 */
export const shareImage = {
  url: 'https://minvitation.site/photos/share-cover.jpg',
  type: 'image/jpeg',
  width: 600,
  height: 600,
}

/** 标题与婚宴资料沿用请柬配置；修改下面三个模板即可调整 meta 的 content 文案。 */
export function getShareMetadata(pathname: string) {
  const invitation = getInvitation(pathname)
  const { audience, groom, bride, banquet } = invitation
  const eventDetails = `${invitation.dateText}，喜宴设于${banquet.venue}，${banquet.reception}，${banquet.time}开席。`
  const descriptions: Record<Audience, string> = {
    couple: `我们结婚啦！${groom.name}与${bride.name}诚邀您见证幸福时刻。${eventDetails}恭候您的到来。`,
    'groom-parents': `${invitation.hostLine}。谨为儿子${groom.name}与儿媳${bride.name}举行婚礼。${eventDetails}恭候您的光临。`,
    'bride-parents': `吾家有喜！谨为女儿${bride.name}与女婿${groom.name}举行婚礼。${eventDetails}诚邀亲朋，共贺良缘。`,
  }

  return {
    title: invitation.pageTitle,
    description: descriptions[audience],
    url: `https://minvitation.site/${audience === 'couple' ? '' : audience}`,
    image: shareImage,
    imageAlt: `${groom.name}与${bride.name}的婚纱合照`,
  }
}
