CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products
(
      item_id INTEGER NOT NULL
      AUTO_INCREMENT,
product_name VARCHAR
      (100) NOT NULL,
department_name VARCHAR
      (100) NOT NULL,
price INTEGER default 0,
stock_quantity INTEGER default 0,
PRIMARY KEY
      (item_id)
);
      INSERT INTO products
            (item_id, product_name, department_name, price, stock_quantity)
      VALUES
            ("1", "Macbook Pro", "Electronics", 150, 3),
            ("2", "Playstation", "Electronics", 400, 5),
            ("3", "IKEA Couch", "Furniture", 100, 1),
            ("4", "Canada Goose", "Clothing", 800, 1),
            ("5", "Skateboard", "Toys", 100, 10),
            ("6", "Dining Table", "Furniture", 40, 2),
            ("7", "Framed Art", "Home Decor", 20, 6),
            ("8", "Round Mirror", "Home Decor", 12, 4),
            ("9", "Queen IKEA Bed", "Furniture", 600, 1),
            ("10", "IKEA Dresser", "Furniture", 200, 2);

      SELECT *
      FROM products;
