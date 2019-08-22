var mysql = require("mysql");
var inquirer = require("inquirer");
var databaseName = "bamazon_db";
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: databaseName
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});
function userPurchasePrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: "Enter the item ID of the product you would like to purchase.",
        filter: Number
      },
      {
        type: "input",
        name: "quantity",
        message: "How many of the product would you like to purchase?",
        filter: Number
      }
    ])
    .then(function(input) {
      var item = input.item_id;
      var quantity = input.quantity;

      var queryStr = `SELECT * FROM products WHERE ?`;

      connection.query(queryStr, { item_id: item }, function(err, data) {
        if (err) throw err;

        if (data.length === 0) {
          console.log("ERROR: Invalid Item ID. Please enter a valid Item ID.");
          displayInventory();
        } else {
          var productData = data[0];
          if (quantity <= productData.stock_quantity) {
            console.log(
              "==================================================================================="
            );
            console.log(
              "Congratulations, the product you have requested is in stock! Placing order!"
            );

            var updateQueryStr =
              "UPDATE products SET stock_quantity = " +
              (productData.stock_quantity - quantity) +
              " WHERE item_id = " +
              item;
            connection.query(updateQueryStr, function(err, data) {
              if (err) throw err;
              console.log(
                "Your order has been placed! Your total $" +
                  productData.price * quantity
              );
              console.log("Thank you for shopping with us! Good-Bye!");
              console.log(
                "==================================================================================="
              );
              connection.end();
            });
          } else {
            console.log(
              "Sorry, there was not enough product in stock, your order cannot be placed as is."
            );
            console.log("Please modify your order.");
            console.log(
              "==================================================================================="
            );
            displayInventory();
          }
        }
      });
    });
}
function displayInventory() {
  queryStr = "SELECT * FROM products";

  connection.query(queryStr, function(err, data) {
    if (err) throw err;

    console.log(
      "Welcome to Bamazon! We have just what you may need in our traveling market! Here is our Existing Inventory: "
    );

    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(
        "==================================================================================="
      );
      console.log(
        `|NAME \t         | ID \t |DEPARTMENT \t | PRICE: \t| STOCK QUANTITY: \t|`
      );
      console.log(
        "==================================================================================="
      );
      for (i = 0; i < res.length; i++) {
        console.log(
          `${res[i].product_name} \t | ${res[i].item_id} \t | ${
            res[i].department_name
          } \t | ${res[i].price} \t        | ${res[i].stock_quantity}`
        );
      }
      console.log(
        "==================================================================================="
      );

      userPurchasePrompt();
    });
  });
}

function runBamazon() {
  displayInventory();
}

runBamazon();
