const fs = require('fs');
const ps = require('process');

try {
  const src = ps.cwd();
  const projectPkg = require(src + '/package.json');
  console.log('patching project script');
  if (projectPkg.scripts === undefined) {
    projectPkg.scripts = { postinstall: 'move-to-types' };
  } else {
    const currPostinstall = projectPkg.scripts.postinstall;

    projectPkg.scripts = {
      ...projectPkg.scripts,
      postinstall: currPostinstall
        ? currPostinstall.indexOf('move-to-types') == -1
          ? `${currPostinstall} & move-to-types`
          : currPostinstall
        : 'move-to-types',
    };
  }
  fs.writeFileSync(src + '/package.json', JSON.stringify(projectPkg, null, 2));
} catch (error) {
  console.log(error.toString());
}
