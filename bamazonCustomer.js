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


//validate number function, ensure user input is greater than 0
function validateNumber(value) {
    var valid = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (valid && (sign === 1)) {
        return true;
    } else {
        return "Please enter a number";
    }
}


//user prompt function to capture and validate the id/quantity they would like to purchase
function purchase() {
    inquirer.prompt([{
            name: "item_id",
            type: "input",
            message: "What is the ID of the item you would like to purchase?",
            validate: validateNumber,
            filter: Number
        },

        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to purchase?",
            validate: validateNumber,
            filter: Number
        }
    ]).then(function (input) {

        //capture user response in variables
        var chosenID = input.item_id;
        var userAmount = input.quantity;
        var queryStr = 'SELECT * FROM products WHERE ?';


        connection.query(queryStr, {
            item_id: chosenID
        }, function (err, data) {
            if (err) throw err;

            //display item selected to verify user input is being captured and correctly pulled from database
            // console.log(res);

            // if user amount requested is less than or equal to stock quantity value, subtract value from stock quantity
            else {
                var itemData = data[0];
                if (userAmount <= itemData.stock_quantity) {
                    console.log("Sending out your order!");

                    //capture query string to update table
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (itemData.stock_quantity - userAmount) + ' WHERE item_id = ' + chosenID;

                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log("Your order is on it's way! The total price is $" + itemData.price * userAmount);

                        connection.end();

                    });

                } else {
                    console.log("Sorry! There is not enough product in stock");

                    //display table after values are updated
                    start();
                }


            }


        });

    });

}


//start function, display table and prompt user
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        //display table
        console.table(res);

        purchase();

    })
}


//run server and database connection with program application functionality

function run() {

    // connection.connect(function (err) {
    //     if (err) throw err;

    //     //run basic start program function to display bamazon table 
    //     start();
    //     // purchase();
    // });
    start();
}

run();