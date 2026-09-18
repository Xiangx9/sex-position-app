# Connect · 姿势教学

类似健身 App 的成人姿势教学网页（仅限成人，强调双方同意与安全）。

## 功能

- 首页：筛选、分类、姿势卡片列表
- 详情页：步骤、技巧、注意事项、相关推荐
- 安全指南页：同意、安全词、身体保护、防护与沟通

当前内置 **19 个姿势**（含详细步骤与技巧），数据在 `src/data/positions.js`。

## 本地运行

需要 Node.js 18+。

```bash
cd sex-position-app
npm install
npm run dev
```

浏览器打开终端提示的地址（一般是 http://localhost:5173）。

## 构建

```bash
npm run build
npm run preview
```

## 如何增加姿势

编辑 `src/data/positions.js`，按现有对象结构追加即可，并在 `related` 里互相引用 `id`。

## 技术栈

- React 18
- React Router 6
- Vite 5
- Tailwind CSS 3
