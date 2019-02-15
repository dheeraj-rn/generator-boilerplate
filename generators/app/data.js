'use strict';

module.exports = {
    swaggerRequire: "const Inert = require('inert');\nconst Vision = require('vision');\nconst HapiSwagger = require('hapi-swagger');\nconst Package = require('../package.json');",
    swaggerRegister: ",\n{\n\
        plugin: Inert,\n\
        options: {}\n\
    },\n\
    {\n\
        plugin: Vision,\n\
        options: {}\n\
    },\n\
    {\n\
        plugin: HapiSwagger,\n\
        options: {\n\
        info: {\n\
            title: 'API Documentation',\n\
            version: Package.version\n\
            }\n\
        }\n\
    },",
    swaggerTest: "-I 'core,__core-js_shared__' ",
    swaggerDependencies: ",\n\"hapi-swagger\": \"^9.3.1\",\n\
    \"inert\": \"^5.1.2\",\n\
    \"vision\": \"^5.4.4\""
};
