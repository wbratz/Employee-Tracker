var express = require("express");
var mysql = require("mysql2");
var fs = require("fs");
var seedDepartment = fs.readFileSync("seedDepartment.sql").toString();
var seedRole = fs.readFileSync("seedRole.sql").toString();
var seedEmployee = fs.readFileSync("seedEmployee.sql").toString();

// Create instance of express app.
var app = express();

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password1",
  database: "employees_db",
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  connection.query("SELECT COUNT(*) AS Count FROM Employee", function (
    err,
    result
  ) {
    if (result[0].Count === 0) {
      seedDatabase();
      queryAllEmployees();
    } else {
      queryAllEmployees();
    }
  });
});

const seedDatabase = () => {
  connection.query(seedDepartment, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  connection.query(seedRole, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  connection.query(seedEmployee, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
};

const queryAllEmployees = () => {
  connection.query("SELECT * FROM employee ORDER BY id", function (
    err,
    result
  ) {
    console.log(result);
  });
};

// Routes
app.get("/api/employees", function (req, res) {
  connection.query("SELECT * FROM employees ORDER BY id", function (
    err,
    result
  ) {
    if (err) throw err;
  });
});
