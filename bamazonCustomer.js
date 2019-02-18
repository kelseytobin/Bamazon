//grab packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

//create connection information
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Ktoby091589!",

    database: "bamazonDB"
});

//establish connection to mysql server and database
connection.connect(function(err) {
    if (err) throw err;
    
    //run basic start program function to display bamazon table and prompt user
    start();
});

//start function, display table and prompt user
function start() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}