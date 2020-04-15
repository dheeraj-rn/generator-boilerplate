'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Test | Boilerplate with Swagger API', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'generator-temp',
      install: true,
    });
  });

  it('Creates Boilerplate template with Swagger API', () => {
    const expected = [
      '.eslintrc.json',
      '.gitignore',
      '.npmignore',
      'README.md',
      'package.json',
      'test/index.js',
      'server/index.js',
      'server/manifest.js',
      'server/.env-keep',
      'lib/routes/.gitkeep',
      'lib/.hc.js',
      'lib/index.js',
    ];
    assert.file(expected);
  });
});
