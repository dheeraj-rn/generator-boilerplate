'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');
const Mongoose = require('mongoose');

exports.plugin = {
    name: 'mongodb',
    pkg: Package,
    register: async (server, options) => {

        // When registering this plugin pass something like this as plugin options:
        // { mongoURI: 'mongodb://localhost/test' }
        server.app.connection = Mongoose.createConnection(options.mongoURI, { useNewUrlParser: true });
        server.app.connection.once('open', () => {

            console.log('connecting to database.');
        });
        //server.app.connection = Mongoose.createConnection('mongodb://localhost/test');

        await HauteCouture.using()(server, options);
    }
};
