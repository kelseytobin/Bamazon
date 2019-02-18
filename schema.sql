
USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INTEGER(11),
    stock_quantity INTEGER(11),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;