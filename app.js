var pg = require('pg');
var asyn = require('async');

var conString = "postgres://localhost:5432/Northwind";

var client = new pg.Client(conString);
client.connect();

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM Categories', function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
// async.series([
//     function(){ ... },
//     function(){ ... }
// ]);
    async.series([
+    function(callback) {
+      console.log("==========");
        console.log('Categories');
        console.log("==========");
      client.query('SELECT * FROM Categories;', function(err, result) {
+        if(err) {
+          return console.error('error running query', err);
+        }
+        result.rows.forEach(function(row) {
+          console.log(row.Description);
+        });
        callback(null, null);
+      });
+    },
+    function(callback) {

function() {
+      client.end();
+    }
+  ]);
  };
    console.log(result.rows);
    client.end();
    //output: 1
  });
});

///////____________THIS WAS USING SQLITE3________________//////////
// var sqlite3 = require('sqlite3');
// var db = new sqlite3.Database('./Northwind.sl3');

// db.serialize(function () {
//   db.run('', function () {
//     console.log("==========");
//     console.log('Categories');
//     console.log("==========");
//   });
//   db.each('SELECT * FROM Categories', function (err, row) {
//     console.log(row.Description.toString());
//   });
//   db.run('', function () {
//     console.log("========");
//     console.log("Products");
//     console.log("========");
//   });
//   db.each('SELECT * FROM Products ' +
//     'INNER JOIN Categories ' +
//     'ON Products.CategoryID = Categories.CategoryID ' +
//     'LIMIT 10', function (err, row) {
//     console.log(row.ProductName + ' is a ' + row.CategoryName);
//   });
//   db.run('', function () {
//     console.log("====================");
//     console.log('Employee Supervisors')
//     console.log("====================");
//   });
//   db.each('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName FROM Employees ' +
//     'LEFT OUTER JOIN Employees AS Supervisors ' +
//     'On Employees.ReportsTo = Supervisors.EmployeeID',
//     function (err, row) {
//     if (row.SupervisorLastName) {
//       console.log(row.EmployeeLastName + "'s supervisor is " + row.SupervisorLastName);
//     } else {
//       console.log(row.EmployeeLastName + " does not have a supervisor");
//     };
// });
//   db.run('DROP TABLE CategoryFavorites');
//   db.run('CREATE TABLE CategoryFavorites ([FavoriteID] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [CategoryID] INTEGER NOT NULL)');
//   for (var i = 2; i <= 8; i+=2) {
//     db.run('INSERT INTO CategoryFavorites (categoryID) VALUES (' + i + ')');
//   }
//   db.each('SELECT * FROM CategoryFavorites', function (err, row) {
//     console.log(row);
//   });
//   db.run('', function () {
//     console.log('===================================');
//     console.log('New CategoryFavorites Module1 Table');
//     console.log('===================================')
//   });
//   db.run('UPDATE CategoryFavorites SET CategoryID = 5 WHERE FavoriteID = 2');
//   db.each('SELECT * FROM CategoryFavorites', function (err, row) {
//     console.log(row);
//   });
//   db.run('', function () {
//     console.log('===================================');
//     console.log('New CategoryFavorites Module2 Table');
//     console.log('===================================');
//   });
//   db.run('DELETE FROM CategoryFavorites WHERE FavoriteID = 3');
//   db.run('INSERT INTO CategoryFavorites (categoryID) VALUES (1)');
//   db.each('SELECT * FROM CategoryFavorites', function (err, row) {
//     console.log(row);
//   });
//   db.close();
// });
