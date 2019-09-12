try {
  console.log('TCL: cwd', require('path').resolve());
  const projectPkg = require('../../package.json');
  console.log('patching project script');
  if (projectPkg.scripts === undefined) {
    projectPkg.scripts = {
      postinstall: 'move-to-types',
    };
  } else {
    const currPostinstall = projectPkg.scripts.postinstall;

    projectPkg.scripts = {
      postinstall: `${currPostinstall} & move-to-types`,
    };
  }
} catch (error) {
  console.log(error.toString());
}
