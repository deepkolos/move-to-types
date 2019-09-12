#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ps = require('process');
const pkg = require('./package.json');
const copydirSync = require('./copyDir.js');
const targetPkg = require(pkg._where + '/package.json');

const pkgName = targetPkg.name.replace(/[\\\/]/g, '_');
const dirUp = targetPkg.name
  .replace(/\\/g, '/')
  .split('/')
  .slice(1)
  .map(i => '../');

const src = ps.cwd();
const desc = path.resolve(src, `../${dirUp}@types/${pkgName}`);

try {
  fs.mkdirSync(desc, { recursive: true });
  copydirSync(src, desc);
  // fs.renameSync(src, desc);
  console.log('copy dir from:', src);
  console.log('copy dir to:', desc);
} catch (error) {
  console.log(error.toString());
}
