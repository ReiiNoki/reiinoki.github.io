import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import type {Props} from '@theme/BlogListPage';

type BlogListItem = Props['items'][number];

type BlogYearGroup = {
  readonly year: string;
  readonly items: BlogListItem[];
};

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function getPostYear(item: BlogListItem): string {
  return new Date(item.content.metadata.date).getUTCFullYear().toString();
}

function groupItemsByYear(items: readonly BlogListItem[]): BlogYearGroup[] {
  const groups: BlogYearGroup[] = [];

  items.forEach((item) => {
    const year = getPostYear(item);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.year === year) {
      lastGroup.items.push(item);
    } else {
      groups.push({year, items: [item]});
    }
  });

  return groups;
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(date: string): string {
  return dateFormatter.format(new Date(date));
}

function formatReadingTime(readingTime?: number): string | null {
  if (typeof readingTime === 'undefined') {
    return null;
  }
  const minutes = Math.ceil(readingTime);
  return minutes === 1 ? 'One min read' : `${minutes} min read`;
}

function BlogYearGroupList({items}: {readonly items: readonly BlogListItem[]}): ReactNode {
  return (
    <div className="noki-blog-index">
      {groupItemsByYear(items).map((group) => (
        <section className="noki-blog-index__group" key={group.year}>
          <h2 className="noki-blog-index__year">{group.year}</h2>
          <ol className="noki-blog-index__posts">
            {group.items.map(({content: BlogPostContent}) => {
              const {metadata} = BlogPostContent;
              const readingTime = formatReadingTime(metadata.readingTime);
              return (
                <li className="noki-blog-index__post" key={metadata.permalink}>
                  <Link className="noki-blog-index__link" to={metadata.permalink}>
                    {metadata.title}
                  </Link>
                  <div className="noki-blog-index__meta">
                    <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
                    {readingTime && <span>{readingTime}</span>}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const {metadata, items} = props;
  return (
    <BlogLayout>
      <BlogYearGroupList items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
