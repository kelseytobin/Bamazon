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


//create function that lists a set of manager menu items and prompts user to select. execute functionality based on user selection through switch case statements
function managerPrompt() {
    inquirer.prompt([{
        type: "list",
        name: "from",
        message: "Select from the following options: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        filter: function(val) {
                
                if (val === "View Products for Sale") {
                    return 'view';
                } else if (val === "View Low Inventory") {
                    return 'low';
                } else if (val === "Add to Inventory") {
                    return 'add';
                } else if (val === "Add New Product") {
                    return 'newProduct'
                }
            }
        }]).then(function(input) {
            if (input.from === 'view') {
                view();
            } else if (input.from === 'low') {
                low();
            } else if (input.from === 'add') {
                add();
            } else if (input.from === 'newProduct') {
                newProduct();
            }
    });
}


//create view products for sale function
function view() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        //display table
        console.table(res);

    });
}

//create view low inventory function
function low() {
    
    //capture search query
    var queryStr = "SELECT * FROM products WHERE stock_quantity < 20";

    connection.query(queryStr, function(err, data) {
        if (err) throw err;
         var lowItem = "";
         for (var i = 0; data.length < i++; ) {
            lowItem = '';
			lowItem += 'Item ID: ' + data[i].item_id + '  //  ';
            lowItem += 'Product Name: ' + data[i].product_name + ' // ';
            lowItem += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(lowItem);
         }
    })
}


//create add to inventory function
function add() {
    view();
    inquirer.prompt([{
        type: "input",
        name: "item_id",
        message: "Enter the ID of the product you would like to increase stock quantity",
        validate: validateNumber,
        filter: Number
    },
    {
        type: "input",
        name: "quantity",
        message: "How many units would you like to add?",
        validate: validateNumber,
        filter: Number
    }]).then(function(input) {
        //capture user response in variables
        var chosenID = input.item_id;
        var userAmount = input.quantity;
        
        //query mysql table to grab selected item information
        var queryStr = 'SELECT * FROM products WHERE ?';


        connection.query(queryStr, {
            item_id: chosenID
        }, function (err, data) {
            if (err) throw err;

            else {
                var itemData = data[0];

                //capture query string to update table where the item is equal to the user chosen id
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (itemData.stock_quantity + userAmount) + ' WHERE item_id = ' + chosenID;

                //update the table stock quantity
                connection.query(updateQueryStr, function (err, data) {
                    if (err) throw err;

                    console.log("The inventory has been updated. The new stock quantity is " + itemData.stock_quantity + userAmount);

                    connection.end();

                });
            }
        })
    })
}

//create add new product function
function newProduct() {
    inquirer.prompt([{
        type: "input",
        name: "product_name",
        message: "Please enter the name of the new item"
    },
    {
        type: "input",
        name: "department_name",
        message: "Please enter the department name of the new item"  
    },
    {
        type: "input",
        name: "price",
        message: "Please enter the cost per single unit of the new item",
        validate: validateNumber
    },
    {
        type: "input",
        name: "stock_quantity",
        message: "How many units would you like to add",
        validate: validateNumber
    }]).then(function(input){
        //display input back to user
        console.log("New Item: \n product_name = " + input.product_name + "\n" +
                    "department_name = " + input.department_name + "\n" +
                    "price = " + input.price + "\n" + "stock_quantity = " + input.stock_quantity);
        
        //declare search query
        var queryStr = "INSERT INTO products SET ?";

        //connect to database and add new product to table
        connection.query(queryStr, input, function(err, res, fields) {
            if (err) throw err;

            console.log("The new item has been added to inventory and given the ID of " + res.inserID);
        
            connection.end();
        
        });
    })
}

 
function run() {
    managerPrompt();
}

run();