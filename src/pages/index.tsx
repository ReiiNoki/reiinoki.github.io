import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useAllBlogPosts, type BlogListItem} from '../utils/blogPosts';

const pinnedPostPermalinks = ['/blog/2026-07-01-brand-new-blog'] as const;
const pinnedPermalinkSet = new Set<string>(pinnedPostPermalinks);
const recentPostLimit = 8;

const rotatingTitles = [
  'Resistance Agent, Ingress',
  'Duelist, Yu-Gi-Oh! Master Duel',
  'Pokémon Trainer, Pokémon Go',
];

const staticSubtitle = rotatingTitles.join(' / ');

function getPinnedPosts(posts: ReadonlyArray<BlogListItem>): ReadonlyArray<BlogListItem> {
  const postsByPermalink = new Map(posts.map((post) => [post.permalink, post]));
  return pinnedPostPermalinks.flatMap((permalink) => {
    const post = postsByPermalink.get(permalink);
    return post ? [post] : [];
  });
}

function getRecentPosts(posts: ReadonlyArray<BlogListItem>): ReadonlyArray<BlogListItem> {
  return posts
    .filter((post) => !pinnedPermalinkSet.has(post.permalink))
    .slice(0, recentPostLimit);
}

function formatMagDate(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function PostList({posts}: {readonly posts: ReadonlyArray<BlogListItem>}): React.ReactElement {
  return (
    <ul className="mag-post-list">
      {posts.map((post) => (
        <li key={post.permalink}>
          <span className="mag-post-date">
            {formatMagDate(post.date)}
          </span>
          <span className="mag-post-sep" aria-hidden="true">━</span>
          <Link to={post.permalink} className="mag-post-title">
            {post.title}
          </Link>
          <span className="mag-post-source">[{post.source}]</span>
        </li>
      ))}
    </ul>
  );
}

function AnimatedSubtitle(): React.ReactElement {
  const [text, setText] = useState(rotatingTitles[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(staticSubtitle);
      return undefined;
    }

    let titleIndex = 0;
    let charIndex = rotatingTitles[0].length;
    let isDeleting = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentTitle = rotatingTitles[titleIndex];

      if (isDeleting) {
        charIndex -= 1;
      } else {
        charIndex += 1;
      }

      setText(currentTitle.slice(0, charIndex));

      if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        timeoutId = setTimeout(tick, 1500);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % rotatingTitles.length;
        timeoutId = setTimeout(tick, 320);
        return;
      }

      timeoutId = setTimeout(tick, isDeleting ? 34 : 58);
    };

    timeoutId = setTimeout(tick, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <p className="mag-subtitle mag-subtitle--animated" aria-label={staticSubtitle}>
      <span className="mag-subtitle-text" aria-hidden="true">
        {text || '\u00a0'}
      </span>
      <span className="mag-type-caret" aria-hidden="true" />
    </p>
  );
}

export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const allPosts = useAllBlogPosts();
  const pinnedPosts = getPinnedPosts(allPosts);
  const recentPosts = getRecentPosts(allPosts);

  return (
    <Layout
      title={siteConfig.title}
      description="Noki's Page — 个人博客"
    >
      <main className="mag-page">
        <header className="mag-header">
          <h1 className="mag-title">Hi, I'm ReiiNoki. You can call me Noki.</h1>
          <AnimatedSubtitle />
        </header>

        <section>
          <h2 className="mag-section-title">
            Pinned Post
          </h2>
          {pinnedPosts.length === 0 ? (
            <p className="mag-empty">暂无置顶文章</p>
          ) : (
            <PostList posts={pinnedPosts} />
          )}
        </section>

        <section>
          <h2 className="mag-section-title">
            Recent Posts
          </h2>
          {recentPosts.length === 0 ? (
            <p className="mag-empty">暂无文章</p>
          ) : (
            <PostList posts={recentPosts} />
          )}
        </section>

        <div className="mag-pageno">reiinoki.github.io</div>
      </main>
    </Layout>
  );
}
