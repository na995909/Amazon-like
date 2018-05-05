
var mysql = require('mysql');
var inquirer = require('inquirer');
var items;
//create connection to DB
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1q2w3e4r",
  port: "3306",
  database: "bamazon"
});


con.connect(function(err) {
  if (err) throw err; 
});
console.log("---------------------------------------------------------------------------------");
console.log("|                                                                               |");
console.log("|                >>>>>>>Welcome to Bamazon online!<<<<<<<<                      |");
console.log("|                                                                               |");
console.log("---------------------------------------------------------------------------------");
queryProducts();


function queryProducts() {
  var query = con.query("SELECT * FROM products", null, function(err, res) {
    console.log("ID | product_name | department_name | price | stock_quantity");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].ID + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    items = res;
    firstPrompt();
  });
}

function firstPrompt(){

    var questions = [
    {
      message: "What is the ID of the product you would like to buy",
      type: "input",
      name: "ID",
      validate: function(value){
        if(isNaN(value) || parseInt(value) != value){
          console.log("");
          console.log("Please insert valid ID from the list above!!!");
          return false;
        }

        for (var i = 0; i < items.length; i++) {

          if(items[i].ID == value){

            return true;  
          }
        }
        console.log("");
        console.log("Inserted Id is not in catalog");
        return false;
      }
    },

    {
        message: "How many units of the product you would like to buy?",
        type: "input",
        name: "Q",
        validate: function(value){

          if(isNaN(value) || parseInt(value) != value){
            console.log("");
            console.log("Please insert valid number!!!");
            return false;
          }
          
          return true;
        }

    }
    ];
    inquirer.prompt(questions).then(function(answer){
      var item = getItemById(answer.ID);
      if (answer.Q > item.stock_quantity){
          console.log("");
          console.log("Sorry! Insufficient Quantity!!!");
          reload();
          return;
      }
      var new_quantity = item.stock_quantity - answer.Q;
      var query = con.query("UPDATE products SET ? WHERE ?",[{stock_quantity:new_quantity},{id:answer.ID}] , function(err, res) {
       if (err) throw err;  
       console.log("Your total is $" + answer.Q * item.price);
      reload();
      });

    });
   

    
}
    
function reload(){
  var question = [{
    message: "Would you like to continue?",
    type: "confirm",
    name: "ans"
  }];
  inquirer.prompt(question).then(function(answer){
    if(answer.ans){
      queryProducts();
      return;
    } else{
      console.log("Thank you for shoping with Bamazon!");
      process.exit();
    }

  });
}


function getItemById(id){
  for (var i = 0; i < items.length; i++) {

    if(items[i].ID == id){

      return items[i];  
    }
  }
}
