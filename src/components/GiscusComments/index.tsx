import React from 'react';
import Giscus from '@giscus/react';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

export default function GiscusComments(): React.ReactElement {
  const {colorMode} = useColorMode();

  return (
    <section className={styles.comments} aria-labelledby="comments-heading">
      <h2 id="comments-heading" className={styles.heading}>Comments</h2>
      <Giscus
        repo="ReiiNoki/reiinoki.github.io"
        repoId="R_kgDOS1K39A"
        category="Announcements"
        categoryId="DIC_kwDOS1K39M4DAQDT"
        mapping="pathname"
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
