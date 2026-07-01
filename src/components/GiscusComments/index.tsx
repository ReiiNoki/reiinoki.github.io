import React from 'react';
import Giscus from '@giscus/react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

export default function GiscusComments(): React.ReactElement {
  const {colorMode} = useColorMode();
  const {metadata} = useBlogPost();
  const stream = metadata.permalink.startsWith('/ingress/')
    ? 'Ingress'
    : 'Blogs';
  const discussionTitle = `[${stream}] ${metadata.title}`;

  return (
    <section className={styles.comments} aria-labelledby="comments-heading">
      <h2 id="comments-heading" className={styles.heading}>Comments</h2>
      <Giscus
        repo="ReiiNoki/reiinoki.github.io"
        repoId="R_kgDOS1K39A"
        category="Announcements"
        categoryId="DIC_kwDOS1K39M4DAQDT"
        mapping="specific"
        term={discussionTitle}
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode === 'dark' ? 'dark_dimmed' : 'light'}
        lang="zh-CN"
        loading="lazy"
      />
    </section>
  );
}
