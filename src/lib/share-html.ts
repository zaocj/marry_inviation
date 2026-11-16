import { getShareMetadata } from '../config/share.ts'

const SHARE_BLOCK = /<!-- invitation-share:start -->[\s\S]*?<!-- invitation-share:end -->/

function escapeHtml(value: string | number) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!)
}

/** 在开发请求与构建产物中直接写入分享标签，不依赖浏览器执行 React。 */
export function renderShareHtml(html: string, pathname: string) {
  if (!SHARE_BLOCK.test(html)) throw new Error('缺少 invitation-share 静态分享标签区块')
  const share = getShareMetadata(pathname)
  const meta = (attribute: 'name' | 'property', key: string, value: string | number) =>
    `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`
  const tags = [
    `<title>${escapeHtml(share.title)}</title>`,
    meta('name', 'description', share.description),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:title', share.title),
    meta('property', 'og:description', share.description),
    meta('property', 'og:url', share.url),
    meta('property', 'og:locale', 'zh_CN'),
    meta('property', 'og:image', share.image.url),
    meta('property', 'og:image:secure_url', share.image.url),
    meta('property', 'og:image:type', share.image.type),
    meta('property', 'og:image:width', share.image.width),
    meta('property', 'og:image:height', share.image.height),
    meta('property', 'og:image:alt', share.imageAlt),
    meta('name', 'twitter:card', 'summary'),
    meta('name', 'twitter:title', share.title),
    meta('name', 'twitter:description', share.description),
    meta('name', 'twitter:image', share.image.url),
    meta('name', 'twitter:image:alt', share.imageAlt),
    `<link rel="canonical" href="${escapeHtml(share.url)}" />`,
    `<link rel="image_src" href="${escapeHtml(share.image.url)}" />`,
  ]

  return html.replace(SHARE_BLOCK, () => `<!-- invitation-share:start -->\n    ${tags.join('\n    ')}\n    <!-- invitation-share:end -->`)
}
