const fs = require('fs'),
      path = require('path');

module.exports = function (packageJson, props, target) {
  // process the packageJson param
  if (!packageJson || packageJson.toString().trim() === '') {
    // an empty path to packageJson
    packageJson = path.resolve(__dirname, 'package.json');
  } else {
    packageJson = packageJson.toString();
  }

  // process the props param
  if (!props || !Array.isArray(props)) {
    props = [];
  }
  console.log(`Using: props: ${props.join(', ')}`);

  // process the target object param
  if (!target || typeof target !== 'object') {
    console.error('A target object is required for copying the package.json properties.');
    return -3;
  }

  let content;
  while (!content) {
    console.info(`Trying ${packageJson}...`);
    try {
      content = fs.readFileSync(packageJson, 'utf8');
    } catch(e) {
      if (e.code === 'EISDIR') {
        console.info(`${packageJson} is a DIR.`);
        if (path.isAbsolute(packageJson)) {
          console.info(`${packageJson} is an absolute path.`);
          packageJson = path.resolve(packageJson, 'package.json');
        } else {
          console.info(`${packageJson} is a relative path.`);
          packageJson = path.resolve(__dirname, packageJson, 'package.json');
        }
        continue;
      } else if (e.code === 'EACCES') {
        console.error(`Permission denied accessing ${packageJson}.`);
        return -1;
      } else if (e.code === 'ENOENT') {
        console.error(`Path not found ${packageJson}`);
        return -1;
      } else {
        console.error(e);
        return -1;
      }
    } // try/catch
  } // while

  console.info(`Successfully read ${packageJson} -> ${typeof content}`);
  // shallow-copy the object data
  try {
    content = JSON.parse(content);
  } catch(e) {
    console.error(`Cannot parse the content of package.json!`);
    console.error(e);
    exit -2;
  }

  for (let prop of props) {
    if (Object.keys(content).includes(prop)) {
      console.info(`\t=> Copying ${prop}...`);
      target[prop] = content[prop];
    }
  }

  console.info(JSON.stringify(target, null, '\t'));
};  // function
