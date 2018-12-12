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
      userName: req.param('userName'),
      password: req.param('password'),
      server: req.param('server'),
      options: {
        database: 'SampleDB'
      }
    }
    var connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    await connection.on('connect', function (err) {
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
    try {
      const Connection = require('tedious').Connection;
      const Request = require('tedious').Request;
      const TYPES = require('tedious').TYPES;
      const async = require('async');

      // Create connection to database
      const config = {
        userName: req.param('userName'),
        password: req.param('password'),
        server: req.param('server'),
        options: {
          database: 'SampleDB'
        }
      }

      const connection = new Connection(config);

      let sql = '';
      sql = `SELECT DISTINCT naics.[ABI]
                    ,[ZIP]
    	              ,cb.*
                    ,nn.*
                    ,fips.fips 
              FROM [DBE].[DW.YTS.NORM].[NAICS10years] naics
              LEFT JOIN [DW.YTS.NORM].[ZIP10years] zip ON zip.abi = naics.abi AND zip.year = naics.year
              LEFT JOIN [DW.YTS.NORM].[FIPS10years] fips ON fips.abi = naics.abi AND fips.year = naics.year
              LEFT JOIN [DW.YTS.NORM].CompanyBasics cb ON cb.abi = zip.abi
              LEFT JOIN [DW.Crosswalk].NAICS_Names nn ON nn.[2012 NAICS US Code] = NAICS
              WHERE FIPS = '19101' AND NAICS IN ()`;

      const request = new Request(sql, function (err, rowCount, rows) {
        if (err) {
          callback(err);
          return res.badRequest({
            data: {
              sql: sql,
              err: err,
              message: 'Query running failed.'
            }
          })
        } else {
          console.log(rowCount + ' row(s) returned');
          callback(null);
          return res.ok({
            data: {
              sql: sql,
              row_count: rowCount,
              rows: rows
            }
          })
        }
      });

    } catch (e) {

    }
  },

};

