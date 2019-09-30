#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ps = require('process');
const pkg = require('./package.json');
const copydirSync = require('./copyDir.js');
const targetPkgPath = pkg._where + '/package.json';
const targetPkg = require(targetPkgPath);

const pkgName =
  'at_' + targetPkg.name.replace(/[\\\/]/g, '_').replace(/@/g, '');
const src = ps.cwd();
const desc = path.resolve(
  targetPkg._where,
  `../node_modules/@types/${pkgName}`,
);
try {
  fs.mkdirSync(desc, { recursive: true });
  copydirSync(src, desc);
  console.log('copy from:', src);
  console.log('copy to:', desc);
} catch (error) {
  console.log(error.toString());
}
