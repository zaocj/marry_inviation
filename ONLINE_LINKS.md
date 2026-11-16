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
