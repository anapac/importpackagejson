const importPackageJson = require('./');

process.packageJson = {};
importPackageJson('D:\\projects\\misc\\apps\\Modules\\importPackageJson',
  [
    'private', 'webpage', 'name', 'version'
  ],
  process.packageJson
);
