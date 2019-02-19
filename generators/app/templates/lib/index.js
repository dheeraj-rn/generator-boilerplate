'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');
<%_ if(mongodb == true) { _%>
const Mongoose = require('mongoose');
<% } %>
exports.plugin = {
    <%_ if(mongodb == true) { _%>
    name: 'mongodb',
    <%_ } _%>
    pkg: Package,
    register: async (server, options) => {

        <%_ if(mongodb == true) { _%>
        // When registering this plugin pass something like this as plugin options:
        // { mongoURI: 'mongodb://localhost/test' }
        server.app.connection = Mongoose.createConnection(options.mongoURI, { useNewUrlParser: true });
        server.app.connection.once('open', () => {

            console.log('connecting to database.');
        });
        //server.app.connection = Mongoose.createConnection('mongodb://localhost/test');
        <%_ } else { _%>
        // Custom plugin code can go here
        <%_ } _%>

        await HauteCouture.using()(server, options);
    }
};
