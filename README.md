# 月明家庭教育网站

目标不是听话优秀，而是让孩子成为自我运转的人。

## 技术栈

- 纯静态 HTML + CSS + 原生 JavaScript
- 部署到 GitHub Pages

## 页面结构

- `index.html` — 首页
- `about.html` — 你好，我是月明
- `system.html` — 四层地图
- `value.html` — 价值四圈（最重要的页面）
- `cases.html` — 真实改变
- `contact.html` — 联系我
- `thanks.html` — 感谢页

## 公共区域

Header 和 Footer 直接写在每个 HTML 文件中，使用 `<!--[HEADER START]-->``<!--[HEADER END]-->` 和 `<!--[FOOTER START]-->``<!--[FOOTER END]-->` 注释标记。修改时请保持所有页面一致。

## 资源配置

- `/resources/judge-flowchart.pdf` — 判断流程图下载
- `/resources/parent-checklist.pdf` — 家长自检句卡片

## 表单配置

联系表单使用 Formspree，提交后将 `contact.html` 中的 `YOUR_FORM_ID` 替换为真实的 Formspree 表单 ID。