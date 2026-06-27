/**
 * 从 Docusaurus blog 插件生成的 sidebar 数据中提取文章元数据。
 *
 * Docusaurus 3 的 blog 插件不会把文章列表写入 useGlobalData()，
 * 而是通过 webpack alias `~blog` 暴露每个插件实例的 sidebar JSON：
 *   ~blog/<pluginId>/blog-post-list-prop-<pluginId>.json
 * 该 JSON 形如：
 *   { title: string, items: Array<{ title, permalink, date, unlisted }> }
 *
 * 在首页（非 blog 路由组件）中读取文章列表，直接 import 这些 JSON 即可。
 */
import defaultSidebar from '~blog/default/blog-post-list-prop-default.json';
import ingressSidebar from '~blog/ingress/blog-post-list-prop-ingress.json';

export interface BlogListItem {
  readonly title: string;
  readonly permalink: string;
  readonly date: string;
  readonly source: string;
}

type SidebarItem = {
  readonly title?: string;
  readonly permalink?: string;
  readonly date?: string;
  readonly unlisted?: boolean;
};

type SidebarJson = {
  readonly title: string;
  readonly items: ReadonlyArray<SidebarItem>;
};

function extractItems(sidebar: SidebarJson, source: string): BlogListItem[] {
  return (sidebar.items ?? [])
    .filter(
      (item): item is SidebarItem & {title: string; permalink: string; date: string} =>
        Boolean(!item.unlisted && item.title && item.permalink && item.date),
    )
    .map((item) => ({
      title: item.title,
      permalink: item.permalink,
      date: item.date,
      source,
    }));
}

/**
 * 合并 default（/blogs）与 ingress（/ingress）两个 blog 的文章，
 * 按日期降序排列。每个 sidebar JSON 本身已按日期降序，这里做归并即可。
 */
export function useAllBlogPosts(): ReadonlyArray<BlogListItem> {
  const merged = [
    ...extractItems(defaultSidebar as SidebarJson, 'blogs'),
    ...extractItems(ingressSidebar as SidebarJson, 'ingress'),
  ];
  return merged.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
