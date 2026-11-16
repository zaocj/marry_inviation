import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
const { getShareMetadata } = await server.ssrLoadModule('/src/config/share.ts')
const { renderShareHtml } = await server.ssrLoadModule('/src/lib/share-html.ts')
const { parentFamilies } = await server.ssrLoadModule('/src/config/invitation.ts')
const template = await readFile(new URL('../index.html', import.meta.url), 'utf8')

try {
  test('三个入口各有独立的静态分享标题、描述和 URL', () => {
    const couple = getShareMetadata('/')
    const groom = getShareMetadata('/groom-parents')
    const bride = getShareMetadata('/bride-parents')
    assert.equal(new Set([couple.title, groom.title, bride.title]).size, 3)
    assert.equal(new Set([couple.description, groom.description, bride.description]).size, 3)
    assert.equal(couple.url, 'https://minvitation.site/')
    assert.equal(groom.url, 'https://minvitation.site/groom-parents')
    assert.equal(bride.url, 'https://minvitation.site/bride-parents')
    assert.match(groom.description, /儿子赵杰与儿媳梁紫艺/)
    assert.match(groom.description, /赵壮虎 · 刘永娟 敬邀/)
    assert.match(bride.description, /女儿梁紫艺与女婿赵杰/)
    assert.doesNotMatch(bride.description, /赵壮虎|刘永娟/)
    assert.deepEqual(getShareMetadata('/bride-parents/'), bride)
  })

  test('分享描述使用对应家庭的日期和婚宴资料', () => {
    const event = parentFamilies['bride-parents'].event
    const previous = { dateText: event.dateText, venue: event.banquet.venue }
    try {
      event.dateText = '测试女方婚宴日期'
      event.banquet.venue = '测试女方婚宴地点'
      assert.match(getShareMetadata('/bride-parents').description, /测试女方婚宴日期.*测试女方婚宴地点/)
      assert.doesNotMatch(getShareMetadata('/groom-parents').description, /测试女方婚宴/)
    } finally {
      event.dateText = previous.dateText
      event.banquet.venue = previous.venue
    }
  })

  test('从已处理的首页生成父母页面时会完整替换分享标签，且不改变资源引用', () => {
    const rootHtml = renderShareHtml(template, '/')
    const parentHtml = renderShareHtml(rootHtml, '/groom-parents')
    const metadata = getShareMetadata('/groom-parents')
    assert.equal((parentHtml.match(/<title>/g) ?? []).length, 1)
    assert.equal((parentHtml.match(/property="og:image"/g) ?? []).length, 1)
    assert.equal((parentHtml.match(/name="description"/g) ?? []).length, 1)
    assert.ok(parentHtml.includes(`<title>${metadata.title}</title>`))
    assert.ok(parentHtml.includes(`<meta property="og:description" content="${metadata.description}" />`))
    assert.ok(parentHtml.includes(`<meta property="og:url" content="${metadata.url}" />`))
    assert.ok(parentHtml.includes(`<link rel="canonical" href="${metadata.url}" />`))
    assert.ok(parentHtml.includes('type="module" src="/src/main.tsx"'))
    assert.ok(parentHtml.includes('href="/photos/header.webp"'))
    assert.doesNotMatch(parentHtml, /content="https:\/\/minvitation\.site\/photos\/header\.webp"/)
  })

  test('静态分享封面是完整 HTTPS JPEG，并声明真实尺寸', async () => {
    const { image } = getShareMetadata('/bride-parents')
    assert.equal(image.type, 'image/jpeg')
    assert.equal(image.width, 600)
    assert.equal(image.height, 600)
    const url = new URL(image.url)
    assert.equal(url.protocol, 'https:')
    const bytes = await readFile(new URL(`../public${url.pathname}`, import.meta.url))
    assert.equal(bytes.readUInt16BE(0), 0xffd8)
    assert.equal(bytes.readUInt16BE(bytes.length - 2), 0xffd9)
  })

  test('HTML 属性中的姓名与文案正确转义，不会生成额外标签', () => {
    const family = parentFamilies['groom-parents']
    const previous = family.father
    try {
      family.father = '赵" & <测试>'
      const html = renderShareHtml(template, '/groom-parents')
      assert.match(html, /赵&quot; &amp; &lt;测试&gt;/)
      assert.doesNotMatch(html, /赵" & <测试>/)
      assert.equal((html.match(/<title>/g) ?? []).length, 1)
    } finally {
      family.father = previous
    }
  })
} finally {
  await server.close()
}
