const importPackageJson = require('./');

process.packageJson = {};
importPackageJson(__dirname,
  [
    'private', 'webpage', 'name', 'version'
  ],
  process.packageJson
);

console.info(JSON.stringify(process.packageJson, null, '\t'));
