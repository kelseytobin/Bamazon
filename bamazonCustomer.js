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


//start function, display table and prompt user
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        //display table
        console.table(res);

        purchase();

    })
}

//validate number function
function validateNumber(value) {
    var valid = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);
    if (valid && (sign === 1)) {
        return true;
    } else {
        return "Please enter a number";
    }
}


//user prompt function
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
        var queryStr = "SELECT * FROM products WHERE item_id = ";
       

        connection.query(queryStr + chosenID, function (err, res) {
            if (err) throw err;

            //display item selected to verify user input is being captured and correctly pulled from database
            // console.log(data);

            // if user amount requested is less than or equal to stock quantity value, subtract value from stock quantity
            else {
                var itemData = res[0];
                if (userAmount <= itemData.stock_quantity) {
                   
                    var queryUpdateStr = "UPDATE products SET stock_quantity = " + (itemData.stock_quantity - userAmount) + "WHERE item_id = " + chosenID;
                    
                    connection.query(queryUpdateStr, function(err, res) {
                        if (err) throw err;

                        console.log("Your order is on it's way!");

                        connection.end();
                        
                    })       
            
                } else {
                    console.log("Sorry! There is not enough product in stock");
                    
                    //display table after values are updated
                    start();
                }

               
            } 


        })

    })

}

//run server and database connection with program application functionality

function run() {

    connection.connect(function (err) {
        if (err) throw err;
    
        //run basic start program function to display bamazon table 
        start();
        // purchase();
    });
}

run();