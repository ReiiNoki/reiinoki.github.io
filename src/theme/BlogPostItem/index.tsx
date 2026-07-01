import React, {type ReactNode} from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme-original/BlogPostItem';
import GiscusComments from '@site/src/components/GiscusComments';
import type {Props} from '@theme/BlogPostItem';

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const {isBlogPostPage} = useBlogPost();

  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage ? <GiscusComments /> : null}
    </>
  );
}
