var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./Northwind.sl3');

db.serialize(function () {
  db.run('', function () {
    console.log('==============');
    console.log('Categories');
    console.log('==============');
  });

  db.each('SELECT * FROM Categories', function (err, row) {
   console.log(row.Description.toString()); //get data from buffer//
  });

  db.run('', function () {
  console.log('==============');
  console.log('Products');
  console.log('==============');
  });

  db.each('SELECT * FROM Products ' +
    'INNER JOIN Categories ' +
    'ON Products.CategoryID = Categories.CategoryID ' +
    'LIMIT 10', function (err, row) {
      console.log(row.ProductName + ' is a ' + row.CategoryName);
    });

  db.run('', function () {
    console.log('==============');
    console.log('Employee Supervisors');
    console.log('==============');
  });
  //Employee Last Name 's supervisor is #{Supervisor LastName}'
  db.each('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName ' +
    'FROM Employees ' +
    'LEFT OUTER JOIN Employees AS Supervisors ' + //LEFT OUTER include Nulls, INNER does NOT!!
    'ON Employees.ReportsTo = Supervisors.EmployeeID', function(err, row) {
      if (row.SupervisorLastName) {
        console.log(row.EmployeeLastName + "'s supervisor is " + row.SupervisorLastName);
      } else {
        console.log(row.EmployeeLastName + ' has no supervisor');
      }
    });

  db.run('CREATE TABLE CategoryFavorites', function() {
    console.log('==============');
    console.log('New CategoryFavorites Table');
    console.log('==============');
  });
  db.close();
});


