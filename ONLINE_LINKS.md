# 婚礼请柬线上分享链接

正式域名：[minvitation.site](https://minvitation.site/)

| 请柬版本 | 线上链接 |
| --- | --- |
| 新人版 | [https://minvitation.site/](https://minvitation.site/) |
| 男方父母版 | [https://minvitation.site/groom-parents](https://minvitation.site/groom-parents) |
| 女方父母版 | [https://minvitation.site/bride-parents](https://minvitation.site/bride-parents) |

## 路径规则

- 根路径 `/` 展示原来的新人版请柬。
- `/groom-parents` 与 `/bride-parents` 分别展示男方、女方父母版，末尾带 `/` 也可访问。
- 其他路径由前端加载时展示新人版；不再通过 `from` 查询参数切换版本。

## 构建与发布

运行 `npm run build` 后，将完整的 `dist/` 目录发布到站点根目录。构建会生成首页以及 `groom-parents/index.html`、`bride-parents/index.html`，支持静态托管时直接打开或刷新两个父母版链接，无需额外配置 SPA 回退。

## 静态分享封面与文案

- 每个入口在原始 HTML 中包含自己对应的 `title`、`description`、`og:title`、`og:description`、`og:url` 和 canonical 地址，抓取时无需执行 React。
- 分享封面使用 [JPEG 婚纱合照](https://minvitation.site/photos/share-cover.jpg)，尺寸为 600 × 600，约 30KB；网页中的婚纱照保持原样。
- 在 `src/config/share.ts` 修改各版本的描述模板（即 meta 标签的 `content`）；标题、日期、称呼和婚宴信息来自 `src/config/invitation.ts`。
- 重新构建后发布整个 `dist/`，包括新的 `photos/share-cover.jpg`。可查看两个父母版的网页源代码，确认不运行 JavaScript 也能看到对应的分享标签。
- 这是静态分享信息，不依赖 SDK。静态预览是否采用、旧分享卡片是否更新，由微信客户端决定；发布后请重新打开页面并重新分享验证。
