DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE  bamazon;
CREATE TABLE products (
ID INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(50) NOT NULL,
PRIMARY KEY(ID)
);
INSERT INTO products( product_name, department_name,price,stock_quantity)
VALUES("Tea Tree Shampoo" , " Beauty & Health" , 15.95, 10), ("Echo & Alexa", "Echo Dot", 
49.99, 20), ("Echo & Alexa", "Echo Plus", 149.99, 10), ("Fairy Couple Dress", "Clothing, Shoes & Jewelry", 
26.99, 5), ("Polka Dots Dress", "Clothing, Shoes & Jewelry", 27.98, 13), ("The Designer", "Books", 14.95, 5), 
("The Hideaway", "Books", 13.32, 7), ("Family Tree Necklace", "Handmade", 56, 1), ("Botanical Print Set", "Handmade", 25, 3), 
("Makeup Bag", "Handmade", 15.50, 10);



