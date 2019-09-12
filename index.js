#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ps = require('process');
const pkg = require('./package.json');

let pkgName;
try {
  pkgName = pkg.name.replace(/[\\\/]/g, '_');
  if (!pkgName) new Error('package.json的name为空');
} catch (error) {
  throw new Error('读取package.json的name失败');
}

const dirUp = pkgName
  .replace('\\', '/')
  .split('/')
  .slice(1)
  .map(i => '../');

const src = ps.cwd();
const desc = path.resolve(src, `../${dirUp}@types/${pkgName}`);

fs.mkdirSync(desc, { recursive: true });

fs.renameSync(src, desc);
console.log('move dir from:', src);
console.log('move dir to:', desc);

// const files = fs.readdirSync(cwd);

// files.forEach(file => {
//   if (file !== 'node_modules')
//     try {
//       console.log('copyFile from:', cwd + '/' + file);
//       console.log('copyFile to:', descPath + '/' + file);
//       fs.copyFileSync(cwd + '/' + file, descPath + '/' + file);
//     } catch (error) {
//       console.log('TCL: error', error);
//     }
// });
