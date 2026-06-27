# Docusaurus 迁移说明

本仓库已从 Jekyll 迁移到 Docusaurus，并整理为更接近 Docusaurus 习惯的目录结构。

## 当前结构

- `blog/`：普通博客，使用 Docusaurus 默认 blog 插件，路由为 `/blogs/`
- `ingress/`：Ingress 专区，使用第二个 `@docusaurus/plugin-content-blog` 实例，路由为 `/ingress/`
- `src/pages/`：独立页面，目前包含首页和留言页
- `static/images/`：站点公共图片
- `static/assets/`：旧站公共 CSS、JS、字体等资源备份
- `static/ingress/`：Ingress 文章旧图片路径，例如 `/ingress/2016-06-12/image001.png`
- `_legacy_jekyll/`：旧 Jekyll 文件备份，没有删除

## 已迁移内容

- `index.md` -> `src/pages/index.md`
- `comment.md` -> `src/pages/comment.md`
- `blogs/*.md` -> `blog/*.md`
- `ingress/*.md` -> `ingress/*.md`
- `images/` -> `static/images/`
- `assets/` -> `static/assets/`
- `ingress/<date>/` 图片目录 -> `static/ingress/<date>/`

## 旧文件备份

以下旧 Jekyll 内容已移动到 `_legacy_jekyll/`：

- `_config.yml`
- `_layouts/`
- `_includes/`
- 原根目录页面：`index.md`、`blogs.md`、`ingress.md`、`comment.md`
- 原 `blogs/`、`ingress/`、`images/`、`assets/` 等目录

## 本地开发

```bash
npm install
npm start
```

默认地址：

```bash
http://127.0.0.1:3000/
```

## 生产构建

```bash
npm run build
```

预览生产构建：

```bash
npm run serve
```

## 部署

GitHub Actions workflow 位于 `.github/workflows/deploy.yml`。

该 workflow 会在 push 到 `main` 后安装依赖、构建 Docusaurus，并通过 GitHub Pages Actions 部署 `build/`。

因为这是用户 Pages 仓库 `reiinoki.github.io`，Docusaurus 配置为：

- `url: https://reiinoki.github.io`
- `baseUrl: /`

## 兼容性说明

- 迁移后的 Markdown 已移除 `layout`、`permalink` 等 Jekyll frontmatter。
- 文章可见标题和正文尽量保持原样。
- 旧图片 URL 使用 `pathname:///...` 保留最终路径。
- `scripts/copy-legacy-assets.mjs` 会在生产构建后补充普通博客旧图片路径 `/blogs/...`。
- Ingress 图片路径由 `static/ingress/` 保留。
- 旧 Disqus Liquid include 已从迁移后的留言页移除。
