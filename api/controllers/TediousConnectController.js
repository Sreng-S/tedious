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

    const Connection = require('tedious').Connection;
    const Request = require('tedious').Request;
    const TYPES = require('tedious').TYPES;
    const db_name = 'DBE';

    // Create connection to database
    var config = {
      userName: req.param('userName'),
      password: req.param('password'),
      server: req.param('server'),
      options: {
        encrypt: true,
        database: 'DBE'
      }
    }
    const connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    await connection.on('connect', function (err) {
      if (err) {
        console.log(err);
        return res.badRequest({
          message: 'Disconnect'
        })
      } else {
        return res.ok({
          message: 'Connect'
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
      const db_name = 'DBE';

      // Create connection to database
      const config = {
        userName: req.param('userName'),
        password: req.param('password'),
        server: req.param('server'),
        options: {
          encrypt: true,
          database: db_name
        }
      };
      let rows = [];
      let rowsCnt = 0;
      let sql = '';
      sql = `SELECT DISTINCT naics.[ABI]
                 ,[ZIP]
                 ,naics.[Year]
                 ,cb.*
                 ,nn.*
                 ,fips.FIPS
              FROM [DBE].[DW.YTS.NORM].[NAICS10years] naics
              LEFT JOIN [DBE].[DW.YTS.NORM].[ZIP10years] zip ON zip.abi = naics.abi AND zip.year = naics.year
              LEFT JOIN [DBE].[DW.YTS.NORM].[FIPS10years] fips ON fips.abi = naics.abi AND fips.year = naics.year
              LEFT JOIN [DBE].[DW.YTS.NORM].CompanyBasics cb ON cb.abi = zip.abi
              LEFT JOIN [DBE].[DW.Crosswalk].NAICS_Names nn ON nn.[2012 NAICS US Code] = NAICS
              WHERE fips.FIPS = '34003'`;

      const connection = new Connection(config);

      function getSQLData(sql) {
        request = new Request(sql, function (err, rowCount, rows) {
          if (err) {
            console.log('Statement Failed:' + err)
          } else {
            rowsCnt = rowCount;
            console.log(rowsCnt + ' rows')
          }
        });
        request.on('row', function(columns) {
          let row = {};
          columns.forEach(function (column) {
            if (column.value === null) {
              row[column.metadata.colName] = 'Null';
            } else {
              row[column.metadata.colName] = column.value;
            }
          });
          rows.push(row);
          // console.log(rows);
        });

        connection.execSql(request);
      }

      connection.on('connect', function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Connected');
          getSQLData(sql);
          // let result = new Promise((resolve, reject) => {
          //   getSQLData(sql);
          //   setTimeout(() => resolve(rows), 3000)

          // });
          setTimeout(() => {
            console.log(rows);

            return res.ok({
              query: sql,
              count: rowsCnt,
              data: rows,
            });
          }, 3000)
        }
      });

      // Print the rows read
      // let result = "";
      // request.on('row', columns => {
      //   columns.forEach(column => {
      //     if (column.valuse === null) {
      //       console.log('NULL');
      //     } else {
      //       result += column.value + " ";
      //     }
      //   });
      //   console.log(result);
      //   result = "";
      // });

      // Execute SQL statement
      // connection.execSql(request);

    } catch (e) {
      console.log(e);
    }
  },

};

