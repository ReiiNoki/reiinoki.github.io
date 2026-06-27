/**
 * Docusaurus blog 插件通过 webpack alias `~blog` 暴露生成的 JSON 数据。
 * 这里声明让 TypeScript 理解 `import ... from '~blog/...'` 的导入。
 */
declare module '~blog/*' {
  const data: {
    title: string;
    items: ReadonlyArray<{
      title: string;
      permalink: string;
      date: string;
      unlisted?: boolean;
    }>;
  };
  export default data;
}
