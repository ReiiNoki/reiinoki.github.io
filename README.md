# Noki's Page

Noki's Page 是一个以文章阅读为核心的个人网站，内容包括技术笔记、日常记录，以及 Ingress、Wayfarer、地图和任务相关文章。网站支持中文、日文和英文内容。

本站由 Jekyll 迁移至 Docusaurus 3，并部署在 GitHub Pages：

**https://reiinoki.github.io**

## 站点栏目

| 栏目 | 路由 | 内容 |
| --- | --- | --- |
| Home | `/` | 个人主页与近期文章 |
| Blogs | `/blogs/` | 技术笔记和日常记录 |
| Ingress | `/ingress/` | Ingress、Wayfarer、地图与任务文章 |
| Comment | `/comment/` | 联系方式与留言入口 |

Blogs 和 Ingress 使用两个独立的 Docusaurus Blog 实例，分别维护文章、列表和订阅源。

## 主题设计

当前主题基于 Docusaurus classic theme，通过少量 React 组件覆盖和 `custom.css` 实现：

- Vice Sunset 风格配色与全站背景
- 支持亮色、暗色和系统主题
- 首页动态身份标题与近期文章列表
- 按年份整理的 Blogs / Ingress 索引
- 面向长文阅读优化的正文宽度、字体、行距和目录
- 响应式 Navbar、文章页面和移动端布局
- 中文、日文和英文混排支持

## 技术栈

- Docusaurus 3
- React
- TypeScript
- Markdown / MDX
- GitHub Actions
- GitHub Pages

## 项目结构

```text
.
├─ blog/                    # 普通博客文章
├─ ingress/                 # Ingress 文章
│  └─ _drafts/             # 未发布草稿
├─ src/
│  ├─ css/custom.css       # 全站主题样式
│  ├─ pages/               # Home 与 Comment 页面
│  ├─ theme/               # Docusaurus 主题覆盖
│  └─ utils/               # 文章数据工具
├─ static/
│  ├─ blogs/               # 普通博客图片
│  ├─ images/              # 头像、图标与背景
│  └─ ingress/             # Ingress 文章图片
├─ docusaurus.config.ts    # 站点、导航与 Blog 配置
└─ .github/workflows/      # GitHub Pages 部署流程
```

## 本地开发

建议使用与 CI 一致的 Node.js 22。

```bash
npm install
npm start
```

本地开发地址：`http://127.0.0.1:3000/`

## 构建与预览

```bash
npm run build
npm run serve
```

生产构建输出到 `build/`。

## 部署

`.github/workflows/deploy.yml` 负责 GitHub Pages 部署：

1. push 到 `main`
2. 使用 `npm ci` 安装依赖
3. 运行 `npm run build`
4. 上传 `build/` 产物
5. 部署到 GitHub Pages

仓库的 Pages 发布来源需要设置为 **GitHub Actions**。

## 从 Jekyll 迁移

迁移过程中保留了现有文章内容、公开路由和正在使用的图片路径，同时完成了以下调整：

- 将普通文章迁移至 `blog/`
- 将 Ingress 内容配置为独立 Blog 实例
- 将静态图片迁移至 `static/`
- 移除 Jekyll frontmatter、Liquid 模板和旧主题资源
- 使用 React 页面重建 Home 与 Comment
- 使用 GitHub Actions 替代 Jekyll 默认构建流程

更具体的目录与兼容性说明见 [MIGRATION_NOTES.md](./MIGRATION_NOTES.md)。
