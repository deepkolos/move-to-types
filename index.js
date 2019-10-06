#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ps = require('process')
const copydirSync = require('./copyDir.js')

const src = ps.cwd()
const targetPkg = require(src + '/package.json')
const pkgName = 'at_' + targetPkg.name.replace(/[\\\/]/g, '_').replace(/@/g, '')

const desc = path.resolve(
  src,
  `${
    ~targetPkg.name.indexOf('@') ? '../../../' : '../../'
  }../node_modules/@types/${pkgName}`,
)

try {
  console.log('copy from:', src)
  console.log('copy to:', desc)
  fs.mkdirSync(desc, { recursive: true })
  copydirSync(src, desc, function(type, src, dir, basename) {
    if (~src.indexOf('node_modules/.bin')) return false
    return true
  })
} catch (error) {
  console.log(error.toString())
}
