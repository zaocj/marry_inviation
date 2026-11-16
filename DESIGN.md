---
name: 婚礼电子请柬
description: 原版新人请柬与独立红金父母请柬的现行设计系统
colors:
  couple-primary: "#931434"
  couple-primary-dark: "#750016"
  couple-wine: "#913b51"
  couple-cream: "#fefbf4"
  couple-blush: "#f8eef1"
  couple-blush-deep: "#efd9df"
  couple-petal: "#e8c4ce"
  couple-champagne: "#f3dfc3"
  couple-gold: "#c9a25e"
  couple-ink: "#2f2a26"
  couple-sand: "#a08b74"
  parents-red: "#a51020"
  parents-deep-red: "#790d1c"
  parents-paper-red: "#b51c2b"
  parents-gold: "#f3d9a0"
  parents-muted: "#e4bd8c"
  parents-rule: "#d6ab6e"
typography:
  couple-body:
    fontFamily: "'Noto Serif SC', 'Songti SC', 'SimSun', serif"
  couple-calligraphy:
    fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif"
  couple-script:
    fontFamily: "'Pattaya', 'Ma Shan Zheng', cursive"
  parents-display:
    fontFamily: "'Parents Calligraphy', 'Ma Shan Zheng', 'Songti SC', serif"
    fontSize: "clamp(32px, 9vw, 43px)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.14em"
  parents-body:
    fontFamily: "'Parents Serif', 'Noto Serif SC', 'Songti SC', serif"
    fontSize: "14px"
    lineHeight: 2.25
  parents-label:
    fontFamily: "'Parents Serif', 'Noto Serif SC', 'Songti SC', serif"
    fontSize: "12px"
    letterSpacing: "0.2em"
rounded:
  parents-square: "0"
  circle: "50%"
  couple-envelope: "8px"
  couple-card: "16px"
  couple-pill: "9999px"
spacing:
  parents-frame-gap: "5px"
  parents-control-gap: "12px"
  parents-envelope-inset: "13px"
  parents-cover-gap: "28px"
  parents-page-padding: "29px 29px 35px"
  parents-gallery-gap: "26px"
components:
  couple-button:
    backgroundColor: "{colors.couple-primary}"
    textColor: "{colors.couple-cream}"
    rounded: "{rounded.couple-pill}"
    padding: "12px 40px"
  parents-open:
    backgroundColor: "{colors.parents-deep-red}"
    textColor: "{colors.parents-gold}"
    rounded: "{rounded.parents-square}"
    width: "188px"
    height: "48px"
    padding: "0"
  parents-navigation:
    backgroundColor: "{colors.parents-gold}"
    textColor: "{colors.parents-deep-red}"
    rounded: "{rounded.parents-square}"
    width: "100%"
  parents-gallery-control:
    backgroundColor: "transparent"
    textColor: "{colors.parents-gold}"
    rounded: "{rounded.parents-square}"
    size: "48px"
  parents-event:
    backgroundColor: "{colors.parents-deep-red}"
    textColor: "{colors.parents-gold}"
    rounded: "{rounded.parents-square}"
    padding: "30px 20px"
---

# Design System: 婚礼电子请柬

## Overview

**Creative North Star: "红纸金帖"**

此项目保留两套有明确边界的视觉系统。新人版沿用丝带、花枝、奶油纸面与酒红色；父母版以「红纸金帖」为方向，用朱红纸面、金色双线框、书法标题和真实婚纱照表达正式而亲切的家庭邀约。

父母版只作用于 `.parents-theme` 内的独立封面与正文。无 `from` 或未知值进入原新人版；`parents`、`groom-parents` 进入男方父母版，`bride-parents` 进入女方父母版。两家父母共用手机触屏单列版式，称呼、姓名顺序与婚宴资料由各自配置决定。

**Key Characteristics:**

- 两套主题隔离，原入口保留。
- 父母版从封套到正文持续红底金字。
- 真实照片、单列触屏阅读与可暂停的两秒轮播。

## Colors

前置 token 中 `couple-*` 是原版值，`parents-*` 是父母版值；名称用于文档，不改写源码变量。

### Primary

- **原版酒红**：`couple-primary` 对应全局 `--color-primary`，用于原版标题、按钮、印章与相册指示。`couple-primary-dark` 是深色搭配，`couple-wine` 用于邀请文字。
- **父母朱红纸**：`parents-red` 是整个父母主题的底色；`parents-deep-red` 用于封面背景、婚宴信息面板与开启按钮；`parents-paper-red` 是封套纸面。

### Secondary

- **父母烫金**：`parents-gold` 用于主要文字、焦点轮廓与实色导航按钮；`parents-muted` 承载农历、称呼、说明等次级文字；`parents-rule` 用于细框、分隔线与按钮边线。
- **原版暖金**：`couple-gold` 与 `couple-champagne` 保留原版装饰、图标与浅金边框。

### Neutral

- **原版纸面与墨色**：`couple-cream` 是正文底色，`couple-ink` 是正文色；`couple-sand` 为次级文字。`couple-blush`、`couple-blush-deep` 和 `couple-petal` 用于原版粉色背景与花瓣。

**The Theme Boundary Rule.** 父母版仅覆盖自身容器内的局部变量，不重定义原版全局颜色。

## Typography

原版保留全局 Noto Serif SC、Ma Shan Zheng、Pattaya 字体栈。父母版局部覆盖衬线与书法字体，使用 `public/fonts/parents-serif.woff2`（400–900）与 `parents-calligraphy.woff2`（400）；两者 `font-display: swap`，来源与许可保存在同目录。加载字体声明不会将其应用到新人版。

- **父母主标题**：使用 `parents-display`，各宽度保持同一手机标题样式；不超过 360px 时为 31px。
- **封套标题与姓名**：书法标题 39px、姓名 32px；`囍` 使用衬线字体 900 字重，常规大小 94px。
- **正文与标签**：`parents-body` 描述欢迎文案，婚宴内容为 14px，辅助说明为 12–13px；不把这些角色强行统一为单一字号。
- **数字**：相册计数与倒计时采用等宽数字；倒计时为 `clamp(30px, 5vw, 44px)`、字重 400。

**The Local Font Rule.** Parents Calligraphy 与 Parents Serif 仅用于父母版；保留原版全局字体栈。

## Layout

父母版始终为有双线外框的手机单列喜帖，最大宽度 500px，页内边距见 `parents-page-padding`；宽屏只居中展示。照片、邀请文字、婚宴、相册依次纵向排列，不切换桌面双栏。首图为 1.26 宽高比，裁切位置 `50% 40%`，细金框内衬 3px；相册保持 3:4 竖幅、5px 内衬。不超过 360px 时左右边距为 25px，并收窄标题与姓名，覆盖 320px 阅读。

页面启用 `viewport-fit=cover`。音乐按钮距底部和右侧分别为 `max(20px, env(safe-area-inset-bottom))`、`max(20px, env(safe-area-inset-right))`；页脚底部留白为 `calc(70px + env(safe-area-inset-bottom))`。

封面使用固定全屏、`100svh` 最小高度、安全区内边距和内部纵向滚动。封套常规最大宽 390px、高 535px；高度不超过 700px 时高 490px，不超过 620px 隐藏底部附注。高度不超过 500px 且宽度至少 600px 时，封套改为最大宽 600px、高 300px 的横向网格，信息在左、囍字在右，开启按钮保持 48px 高、距封套底部 4px；同高度且宽度不超过 599px 时从顶部排列并可滚动，避免内容被截断。

原版继续使用原有 Tailwind 响应式布局、粉色封套背景与独立区块，不套用以上父母版断点。

## Elevation & Depth

父母正文主要以深浅红纸、细金框和分隔线形成层次；没有卡片堆叠。实体封套使用 `0 24px 65px #39030d66` 阴影，音乐按钮使用 `0 4px 16px #39030d33`。折页以多边形裁切、1000px 透视和顶部旋转轴表达纸张结构。原版保留圆角卡片、花枝、火漆印章及其既有阴影。

## Shapes

父母纸面、照片边框、开启按钮、导航与相册按钮均为直角。外框与内框通过嵌套 1px 细线形成双框，常规内框间距见 `parents-frame-gap`。圆形只出现在封签与悬浮音乐按钮。原版封套圆角、卡片圆角和胶囊按钮继续使用 `couple-*` 圆角 token。

## Components

### 封套与开启

红纸封套上完整显示标题、家庭称呼、孩子姓名、日期与可用署名。开启按钮采用深红底、金色文字与边线，按下底色 `#600815`；开启中禁用并显示进度文字。折页翻转 180 度、内页上移 20px（`.6s cubic-bezier(.16, 1, .3, 1)`），封面延迟 `.45s` 后以 `.65s` 上移 32px 并淡出。减弱动态时取消 CSS 动画与过渡，封面只进行 `.15s` 淡出。

### 阅读与焦点

封套存在时正文 `inert` 且 `aria-hidden`，页面滚动锁定；开启完成后回到顶部，将焦点交给正文主标题且不滚动。双方父母版与新人版均在开启后延迟 900ms 启动缓慢自动滚动，逐渐加速至 120px/秒，触摸或主动滚动页面后停止，滚到页尾自动结束。保留页内「恭请光临」锚点。按钮与链接键盘焦点为 2px 金色轮廓、外移 6px；主标题的程序焦点不绘制轮廓。

### 婚宴与导航

婚宴采用深红底直角信息面板，标签与内容分列。金底深红字导航按钮宽度铺满、最小高 48px，按下底色 `#ffebc0`；在当前页打开由当前家庭地点与城市生成的高德导航链接。双方婚宴配置独立，目前使用同一场婚宴资料。

### 相册

复用 `/photos/section_1.webp` 至 `section_12.webp`，双方父母版均每 2 秒自动循环。只在请帖已开启、相册至少 25% 进入视口、页面前台、自动播放启用且未触摸时计时；触摸滑动期间暂停，松手或翻页后重新计满 2 秒。Swiper 支持左右触摸滑动，不提供翻页箭头或鼠标拖动；`touch-action: pan-y` 保留纵向页面滚动，相邻各一张预加载。

照片下方将「左右滑动」提示、等宽计数与 48px 方形金框暂停／继续按钮靠左成组排列（`auto auto 48px`），右侧留给悬浮音乐按钮，避免 320px 屏幕控件重叠；暂停按钮按下使用深红底。自动播放时计数播报关闭，暂停时通过 `aria-live="polite"` 宣告。常规切换为 350ms；减弱动态时切换时长为 0。首屏复用 `/photos/header.webp`，相册图片延迟加载。

### 音乐与页脚

复用 `/audio/background.mp3` 与原音乐逻辑：尝试播放、必要时由首次手势启动，开关跟随真实播放状态，播放时旋转一周为 6s。父母版只覆盖其深红底、金字、金框与阴影；按钮为 48px，按手机安全区定位，页脚预留底部空间。减弱动态取消旋转。页脚继续展示现有备案资料；女方版不显示父母姓名或署名。

## Do's and Don'ts

### Do:

- Do 将父母版颜色与字体限定在父母主题容器内。
- Do 使用现有真实婚纱照、音乐和备案资料。
- Do 保留男方儿子／儿媳顺序及女方女儿／女婿顺序。
- Do 保留开启后的焦点交接、键盘焦点与减弱动态支持。
- Do 使用触摸滑动、至少 48px 的主要触控按钮和按下反馈。

### Don't:

- Don't 用父母版红金色覆盖原版全局 token。
- Don't 为女方版本补造父母姓名或父母署名。
- Don't 移除相册的暂停控制，或在宾客触摸后强制恢复页面自动滚动。
- Don't 将本地父母字体的作用域扩展至原新人版。
- Don't 为父母版添加桌面双栏、鼠标拖动或相册翻页箭头。
