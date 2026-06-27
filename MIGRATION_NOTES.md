# Docusaurus 迁移说明

本仓库已从 Jekyll 迁移到 Docusaurus 3，并移除不再使用的 Jekyll 主题、模板和资源。

## 当前结构

- `blog/`：普通博客，路由为 `/blogs/`
- `ingress/`：Ingress 专区，使用第二个 Blog 插件，路由为 `/ingress/`
- `ingress/_drafts/`：未发布草稿
- `src/pages/`：首页和留言页
- `src/theme/`：少量 Docusaurus 主题覆盖
- `static/blogs/`：普通博客文章图片
- `static/ingress/`：Ingress 文章图片
- `static/images/`：头像、站点图标和背景图片

## 兼容性

- 迁移后的 Markdown 已移除 Jekyll 专用 frontmatter。
- 文章路由和已使用的公共图片路径保持不变。
- 本地图片通过 `pathname:///...` 引用，由 Docusaurus 从 `static/` 直接发布。

## 本地开发

```bash
npm install
npm start
```

默认地址为 `http://127.0.0.1:3000/`。

## 构建与部署

```bash
npm run build
npm run serve
```

GitHub Actions workflow 位于 `.github/workflows/deploy.yml`。合并到 `main` 后，工作流会构建站点并部署到 GitHub Pages。
