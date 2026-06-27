import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function CommentPage(): React.ReactElement {
  return (
    <Layout
      title="Comment · Noki's Page"
      description="留言与联系"
    >
      <main className="mag-page">
        <header className="mag-header">
          <h1 className="mag-title">Comment</h1>
          <p className="mag-subtitle">留言与联系</p>
        </header>

        <section>
          <h2 className="mag-section-title">欢迎留言</h2>
          <p
            style={{
              color: 'var(--ifm-font-color-secondary)',
              lineHeight: 1.85,
            }}
          >
            有任何问题、建议或想交流的内容，可以通过以下方式联系我。
          </p>
        </section>

        <section>
          <h2 className="mag-section-title">联系方式 / CONTACT</h2>
          <div className="mag-section-grid" style={{ marginTop: '0.5rem' }}>
            <a
              href="https://t.me/ReiiNoki"
              target="_blank"
              rel="noopener noreferrer"
              className="mag-section-item"
            >
              <span className="mag-section-icon">/</span>
              <span className="mag-section-name">Telegram</span>
              <span className="mag-section-desc">@ReiiNoki</span>
            </a>
            <a
              href="mailto:reiinoki@outlook.com"
              className="mag-section-item"
            >
              <span className="mag-section-icon">/</span>
              <span className="mag-section-name">Email</span>
              <span className="mag-section-desc">reiinoki@outlook.com</span>
            </a>
            <a
              href="https://github.com/ReiiNoki/reiinoki.github.io/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="mag-section-item"
            >
              <span className="mag-section-icon">/</span>
              <span className="mag-section-name">GitHub Issues</span>
              <span className="mag-section-desc">在仓库提 issue 留言</span>
            </a>
            <a
              href="https://github.com/ReiiNoki"
              target="_blank"
              rel="noopener noreferrer"
              className="mag-section-item"
            >
              <span className="mag-section-icon">/</span>
              <span className="mag-section-name">GitHub</span>
              <span className="mag-section-desc">个人主页</span>
            </a>
          </div>
        </section>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/" className="mag-link">
            返回首页
          </Link>
        </div>

        <div className="mag-pageno">reiinoki.github.io/comment</div>
      </main>
    </Layout>
  );
}
