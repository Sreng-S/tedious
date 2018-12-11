/**
 * TediousConnectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: 'TediousConnect Controller',

  description: 'This is a MYSQL Server Connection - REST API controller.',

  checkingConnection: async function (req, res) {

    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    // Create connection to database
    var config = {
      userName: req.param('userName'), // update me
      password: req.param('password'), // update me
      server: req.param('server'),
      options: {
        database: 'SampleDB'
      }
    }
    var connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    await connection.on('connect', function(err) {
      if (err) {
        console.log(err);
        return res.badRequest({
          err: err,
          message: 'Disconnected MS-SQL Server.'
        })
      } else {
        console.log('Connected');
        return res.ok({
          message: 'Connected MS-SQL Server.'
        })
      }
    });

  },

  runQuery: async function (req, res) {

  },

};

