'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the scrumtrulescent ${chalk.red('generator-boilerplate')} generator!`)
    );

    const prompts = [
      {
        type    : 'input',
        name    : 'title',
        message : 'Your generator name',
        default: path.basename(process.cwd()),
        validate: str => {
          return str.length > 0;
        }
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Would you like to install boilerplate?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    
    if(this.props.install){
      this.fs.copy(
        this.templatePath('_README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { title: this.props.title }
      );
      this.fs.copy(
        this.templatePath('_npmignore'),
        this.destinationPath('.npmignore')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
  
      this.fs.copy(
        this.templatePath('test/index.js'),
        this.destinationPath('test/index.js')
      );
  
      this.fs.copy(
        this.templatePath('server/index.js'),
        this.destinationPath('server/index.js')
      );
      this.fs.copy(
        this.templatePath('server/manifest.js'),
        this.destinationPath('server/manifest.js')
      );
      this.fs.copy(
        this.templatePath('server/.env-keep'),
        this.destinationPath('server/.env-keep')
      );
  
      this.fs.copy(
        this.templatePath('lib/routes/.gitkeep'),
        this.destinationPath('lib/routes/.gitkeep')
      );
      this.fs.copy(
        this.templatePath('lib/.hc.js'),
        this.destinationPath('lib/.hc.js')
      );
      this.fs.copy(
        this.templatePath('lib/index.js'),
        this.destinationPath('lib/index.js')
      );
    }
  }

  install() {
    if(this.props.install){
      this.installDependencies({
        npm: true,
        bower: false,
        yarn: false
      });
    }
  }
};