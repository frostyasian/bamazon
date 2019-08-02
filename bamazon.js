let databaseName = "bamazon_db";
let tableName = "products";
///////////////////////////////
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: databaseName
});
//RUN PROGRAM//
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showAllItems();
});
//PRODUCT FUNCTIONS//
function pickingAnItem(product_name) {
  connection.query(
    `SELECT product_name FROM ${tableName} WHERE product_name='${product_name}'`,
    function(err, res) {
      if (err) throw err;
      console.log(res);
      let stock_quantity;
    }
  );
}
