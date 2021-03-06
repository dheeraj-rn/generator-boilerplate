'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../package.json');
const HapiPluginHeader = require('hapi-plugin-header');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

<%_ if(mongodb == true) { _%>
const mongoURL = 'mongodb://' + process.env.MONGO_DB_USER + ':' + process.env.MONGO_DB_PASS + '@' + process.env.MONGO_DB_HOST + '/' + process.env.MONGO_DB_NAME; <%_ } _%>

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        routes: {
            security: true
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: { <% if(mongodb == true) { %> mongoURI: mongoURL <% } %> }
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop
                }
            },
            {
                plugin: Inert,
                options: {}
            },
            {
                plugin: Vision,
                options: {}
            },
            {
                plugin: HapiSwagger,
                options: {
                    info: {
                        title: 'API Documentation',
                        version: Package.version
                    },
                    securityDefinitions: {
                        Bearer: {
                            type: 'apiKey',
                            name: 'Authorization',
                            in: 'header',
                            'x-keyPrefix': 'Bearer '
                        }
                    },
                    security: [{ Bearer: [] }],
                    deReference: false,
                    cache: {
                        expiresIn: 24 * 60 * 60 * 1000
                    }
                }
            },
            {
                plugin: HapiPluginHeader,
                options: {
                    'X-Dns-Prefetch-Control': 'off'
                }
            }<%_ if(psql == true) { _%>,
            {
                plugin: 'schwifty',
                options: {
                    $filter: 'NODE_ENV',
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            client: 'pg',
                            connection: {
                                host : process.env.PG_DB_HOST,
                                user : process.env.PG_DB_USER,
                                password : process.env.PG_DB_PASS,
                                database : process.env.PG_DB_NAME
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }
                }
            }<% } %>
        ]
    }
});
