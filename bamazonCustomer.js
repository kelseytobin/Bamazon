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
connection.connect(function (err) {
    if (err) throw err;

    //run basic start program function to display bamazon table 
    start();
    purchase();
});

//start function, display table and prompt user
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        //display table
        console.table(res);

        //end connection
        // connection.end();

    })
}

//validate number function
function validateNumber(value) {
    var valid = !isNaN(parseFloat(value));
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
            name: "purchase",
            type: "input",
            message: "What is the ID of the item you would like to purchase?",
            validate: validateNumber(),
            filter: Number
        },

        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to purchase?",
            validate: validateNumber(),
            filter: Number
        }
    ]).then(function (answer) {

        //capture user response in variables
        var chosenID = answer.purchase;
        var userAmount = answer.quantity;
        var query = "SELECT * FROM products WHERE item_id = ";
       

        connection.query(query + chosenID, function (err, res) {
            if (err) throw err;

            //display item selected to verify user input is being captured and correctly pulled from database
            // console.log(data);

            // if user amount requested is less than or equal to stock quantity value, subtract value from stock quantity
            else {
                if (userAmount <= itemData.stock_quantity) {
                    var itemData = res[0];
                    var queryUpdate = "UPDATE products SET stock_quantity = " + (itemData.stock_quantity - userAmount) + "WHERE" + chosenID;
                    
                    connection.query(queryUpdate, function(err, res) {
                        if (err) throw err;

                        console.log("Your order is on it's way!");
                        
                    })       
            
                } else {
                    console.log("Sorry! There is not enough product in stock");
                }

               
            } 


        })


        //display table after values are updated
        start();

    })

}