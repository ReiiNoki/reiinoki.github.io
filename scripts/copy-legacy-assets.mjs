import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function copyDir(source, target) {
  fs.mkdirSync(target, {recursive: true});
  fs.cpSync(source, target, {recursive: true, force: true});
}

function copyArticleAssetDirs(sourceRoot, buildRoot) {
  const sourceDir = path.join(root, sourceRoot);
  if (!fs.existsSync(sourceDir)) {
    return;
  }

  for (const entry of fs.readdirSync(sourceDir, {withFileTypes: true})) {
    if (entry.isDirectory()) {
      copyDir(path.join(sourceDir, entry.name), path.join(root, 'build', buildRoot, entry.name));
    }
  }
}

copyArticleAssetDirs('_legacy_jekyll/blogs', 'blogs');
copyArticleAssetDirs('_legacy_jekyll/ingress', 'ingress');
