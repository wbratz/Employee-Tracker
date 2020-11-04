var express = require("express");
var mysql = require("mysql");

// Create instance of express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Gizmoe_90!",
  database: "employees"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  queryAllEmployees();
});

// Routes
app.get("/employees", function(req, res) {
  connection.query("SELECT * FROM employees ORDER BY id", function(err, result) {
    if (err) throw err;
    
    var html = "<h1>Employees Ordered BY ID</h1>";

    html += "<ul>";

    for (var i = 0; i < result.length; i++) {
      html += "<li><p> ID: " + result[i].id + "</p>";
      html += "<p> Name: " + result[i].name + "</p>";
      html += "<p> Salary: " + result[i].salary + "</p>";
      html += "<p>Department: " + result[i].department + "</p></li>";
    }

    html += "</ul>";

    res.send(html);
  });
});