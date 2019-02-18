'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
//const beautify = require("gulp-beautify");
//const filter = require('gulp-filter');
//const jsFilter = filter(['**/*.js', '**/*.json'], { restore: true });

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the scrumtrulescent ${chalk.red('generator-boilerplate')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'Your project name',
        default: path.basename(process.cwd()),
        validate: str => {
          return str.length > 0;
        }
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Would you like to install Boilerplate with Swagger API?',
        default: true
      }
      /*{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like to generate?',
        choices: [{
          name: 'Boilerplate',
          value: 'includeBoilerplate',
          checked: true
        },
        {
          name: 'Swagger API',
          value: 'includeSwagger',
          checked: false
        }
        ]
      }*/
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      /*if(this.props.features.includes('includeBoilerplate')){
        this.includeBoilerplate = true;
      } else {
        this.includeBoilerplate = false;
      }
      if(this.props.features.includes('includeSwagger')){
        this.includeSwagger = true;
      } else {
        this.includeSwagger = false;
      }
      this.registerTransformStream(jsFilter);
      this.registerTransformStream(beautify({ indent_size: 2 }));
      this.registerTransformStream(jsFilter.restore);
      this.log(this.props.features)*/
    });
  }

  writing() {
    
    //if(this.props.features.includes('includeBoilerplate')){
    if(this.props.install){
      this.fs.copy(
        this.templatePath('_README.md'),
        this.destinationPath('README.md')
      );

      /*if(this.props.features.includes('includeSwagger')){

        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          {
            title: this.props.title,
            swaggerTest: data.swaggerTest,
            swaggerDependencies: data.swaggerDependencies
          }
        );

        this.fs.copyTpl(
          this.templatePath('server/manifest.js'),
          this.destinationPath('server/manifest.js'),
          {
            swaggerRequire: this.includeSwagger,
            swaggerRegister: data.swaggerRegister
          }
        );

      } else {*/
        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          {
            title: this.props.title,
            //swaggerTest: "",
            //swaggerDependencies: ""
          }
        );

        this.fs.copyTpl(
          this.templatePath('server/manifest.js'),
          this.destinationPath('server/manifest.js'),
          /*{
            swaggerRequire: "",
            swaggerRegister: ""
          }*/
        );
      //}

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