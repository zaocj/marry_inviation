import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

// 使用项目已有的 Vite 转换 TS，兼容 package.json 支持的 Node 版本。
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
const { getInvitation, parentFamilies, resolveAudience } = await server.ssrLoadModule('/src/config/invitation.ts')

try {
  test('仅父母版路径进入对应版本，根路径与其他路径保持原版', () => {
    for (const path of ['', '/', '/other', '/parents', '/Groom-parents', '/groom-parents/other', '/other/bride-parents']) {
      assert.equal(resolveAudience(path), 'couple', path)
      const original = getInvitation(path)
      assert.equal(original.groom.role, '新郎')
      assert.equal(original.bride.role, '新娘')
      assert.equal(original.heroTagline, '我们结婚啦')
      assert.equal(original.hostLine, null)
    }
    assert.equal(resolveAudience('/groom-parents'), 'groom-parents')
    assert.equal(resolveAudience('/bride-parents'), 'bride-parents')
    assert.deepEqual(getInvitation('/groom-parents/'), getInvitation('/groom-parents'))
    assert.deepEqual(getInvitation('/bride-parents/'), getInvitation('/bride-parents'))
  })

  test('查询参数不再决定版本，也不会覆盖路径选择', () => {
    for (const from of ['parents', 'groom-parents', 'bride-parents']) {
      for (const [path, audience] of [['/', 'couple'], ['/groom-parents', 'groom-parents'], ['/bride-parents', 'bride-parents']]) {
        const url = new URL(`${path}?from=${from}`, 'https://minvitation.site')
        assert.equal(getInvitation(url.pathname).audience, audience)
      }
    }
  })

  test('男方使用儿子儿媳称呼与真实父母署名', () => {
    const groom = getInvitation('/groom-parents')
    assert.equal(groom.envelopeRoles, '儿子 · 儿媳')
    assert.equal(groom.groom.role, '儿子')
    assert.equal(groom.bride.role, '儿媳')
    assert.equal(groom.brideFirst, false)
    assert.equal(groom.hostLine, '赵壮虎 · 刘永娟 敬邀')
  })

  test('女方优先显示女儿、女婿，不显示父母姓名或套用男方署名', () => {
    const bride = getInvitation('/bride-parents')
    assert.equal(bride.envelopeRoles, '女儿 · 女婿')
    assert.equal(bride.bride.role, '女儿')
    assert.equal(bride.groom.role, '女婿')
    assert.equal(bride.brideFirst, true)
    assert.equal(bride.pageTitle, '女儿梁紫艺与女婿赵杰 · 婚礼请柬')
    assert.equal(bride.hostLine, null)
    assert.deepEqual(bride.hosts, [])
    assert.ok(!JSON.stringify(bride).includes('赵壮虎'))
    assert.ok(!JSON.stringify(bride).includes('刘永娟'))
  })

  test('两家婚宴可独立配置，修改女方不会影响男方及默认请帖', () => {
    const brideEvent = parentFamilies['bride-parents'].event
    const oldVenue = brideEvent.banquet.venue
    const oldKeyword = brideEvent.amap.keyword
    try {
      brideEvent.banquet.venue = '测试女方婚宴地点'
      brideEvent.amap.keyword = '测试女方导航地点'
      assert.equal(getInvitation('/bride-parents').banquet.venue, '测试女方婚宴地点')
      assert.equal(getInvitation('/bride-parents').amap.keyword, '测试女方导航地点')
      assert.equal(getInvitation('/groom-parents').banquet.venue, oldVenue)
      assert.equal(getInvitation('/').banquet.venue, oldVenue)
      assert.equal(getInvitation('/groom-parents').amap.keyword, oldKeyword)
    } finally {
      brideEvent.banquet.venue = oldVenue
      brideEvent.amap.keyword = oldKeyword
    }
  })
} finally {
  await server.close()
}
