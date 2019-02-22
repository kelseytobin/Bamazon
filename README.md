# Bamazon
**CLI Node and MySql Application**

## Introduction
Bamazon is a command line application focused on connecting to and querying a local MySql database for different user input related commands. Bamazon uses Node and the Inquirere package to take in user parameters and return the requested data or perform requested updates to the MySql database.

There are two parts, the Bamazon Customer Interface and the Bamazon Manager Interface - each rendering varying functionality based on user input. 

### Bamazon Customer
User will run the command **node bamazonCustomer** and a table displaying the items available will be logged to command line. They will be prompted to enter the value of the item id and the quantity they would like to purchase.

![Customer1](images/customer1.PNG)

After entering the required information, if there is enough stock available the purchase will go through and the user will be updated of the total cost.

![Customer2](images/customer2.PNG)

The user will then run **node bamazonCustomer** again to view the updated stock quantity value.

### Bamazon Manager
User will run the command **node bamazonManager** and a list of options will display to the console. The user will select which option they would like to run and proceed through the prompted steps

#### Manager Task Options List

![Manager1](images/manager1.PNG)

#### Manager View Inventory

![Manager-View](images/manager-view.PNG)

#### Manager View Low Inventory

![Manager-Low](images/manager-low.PNG)

#### Manager Add to Inventory

![Manager-Add](images/manager-add.PNG)

![Manager-Add](images/manager-add2.PNG)

#### Manager Add New Product

![Manager-New](images/manager-new.PNG)

![Manager-New](images/manager-new2.PNG)

##### Packages
**1.NPM Packages Used**
    
    Inquirer

    MySql

    cTable

**To install these packages run the following commands in your terminal**
    
    npm install inquirer

    npm install mysql

    npm install console.table

    






