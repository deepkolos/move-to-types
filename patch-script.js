const fs = require('fs');
try {
  const projectPkg = require('../../package.json');
  console.log('patching project script');
  if (projectPkg.scripts === undefined || !projectPkg.scripts.postinstall) {
    projectPkg.scripts = {
      ...projectPkg.scripts,
      postinstall: 'move-to-types',
    };
  } else {
    const currPostinstall = projectPkg.scripts.postinstall;

    projectPkg.scripts = {
      ...projectPkg.scripts,
      postinstall: `${currPostinstall} & move-to-types`,
    };

    fs.writeFileSync('../../package.json', JSON.stringify(projectPkg, null, 2));
  }
} catch (error) {
  console.log(error.toString());
}
