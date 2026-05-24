# 月明·向未来家庭教育网站

这是一个纯静态多页面站点，用来讲清三件事：

1. 这套做法是怎么从真实家庭现场里长出来的
2. 我怎么判断一个家现在卡在哪一层
3. 为什么最后要把目光放到“孩子还能从哪里重新开始”

## 技术栈

- 纯静态 HTML
- 单文件 CSS：`D:\BaiduSyncdisk\AIclaw\claude code\Home-teach\css\style.css`
- 原生 JavaScript
  - `D:\BaiduSyncdisk\AIclaw\claude code\Home-teach\js\site-shell.js`：公共头尾注入
  - `D:\BaiduSyncdisk\AIclaw\claude code\Home-teach\js\site-ui.js`：全站公共交互
  - `D:\BaiduSyncdisk\AIclaw\claude code\Home-teach\js\main.js`：页面叙事动效

## 页面结构

- `index.html` — 首页 / 站点总入口
- `about.html` — 这套做法怎么长出来
- `system.html` — 我怎么判断
- `cases.html` — 它怎样在真实服务里成立
- `value.html` — 为什么走向未来
- `engine.html` — 背后托住的那一半
- `contact.html` — 带着问题来
- `thanks.html` — 表单提交成功页

## 公共结构

页面中的 Header / Footer 通过下面两个挂载点注入：

- `<div data-site-header></div>`
- `<div data-site-footer></div>`

对应脚本：

- `D:\BaiduSyncdisk\AIclaw\claude code\Home-teach\js\site-shell.js`

修改导航、页脚品牌信息、外部链接时，优先改这个文件。

## 资源页

`D:\BaiduSyncdisk\AIclaw\claude code\Home-teach\resources\` 里放的是可打印 HTML 资源页：

- `judge-flowchart.html` — 家庭教育四层判断流程图
- `parent-checklist.html` — 家长自检句卡片

这些资源页建议在浏览器里打开后使用 `Ctrl + P` 打印或另存为 PDF。

## 联系表单

联系表单使用 Formspree：

- 页面：`D:\BaiduSyncdisk\AIclaw\claude code\Home-teach\contact.html`
- 当前 action：`https://formspree.io/f/xzdodazd`

提交成功后跳转到：

- `D:\BaiduSyncdisk\AIclaw\claude code\Home-teach\thanks.html`

## 开发备注

- `_temp/` 是本地临时调试目录，不进入版本控制。
- 图片资源较多时，优先保留站点实际在用的版本；打印素材和备用图请分开管理。
