const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

const db = new sqlite3.Database('./cpq.db', (err) => {
    if (err) {
        console.log("Database Connection Error: ",err);
    }else {
        console.log("Connected to Sqlite Database.")
    }
});

//Create Tables
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Products (id INTEGER PRIMARY KEY, model TEXT, basePrice INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS Customers (id TEXT PRIMARY KEY, name TEXT, loyaltyLevel TEXT, discountPercentage INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS Orders (id INTEGER PRIMARY KEY AUTOINCREMENT, customerId TEXT, configId TEXT, finalPrice INTEGER)");
});

//CPQ API (Product Configuration)
app.post('/cpq/configure', (req,res) => {
    const {model} = req.body;
    db.get("SELECT basePrice FROM Products WHERE model = ?", [model], (err,row) => {
        if (err || !row) {
            return res.status(404).json({
                error: "Product not found!!!"
            })
        }
        res.json({configId:`CPQ${Math.floor(Math.random() * 10000)}`, basePrice: row.basePrice})
    })
})

//CRM API (Get Customer Discount)
app.get("/crm/customer/:customerId", (req, res) => {
    const { customerId } = req.params;
    db.get("SELECT * FROM Customers WHERE id = ?", [customerId], (err, row) => {
      if (err || !row) return res.status(404).json({ error: "Customer not found" });
      res.json(row);
    });
  });
  
  //ERP API (Place Order)
  app.post("/erp/order", (req, res) => {
    const { configId, customerId, basePrice, discount } = req.body;
    const finalPrice = basePrice - (basePrice * discount) / 100;
    
    db.run("INSERT INTO Orders (customerId, configId, finalPrice) VALUES (?, ?, ?)", 
      [customerId, configId, finalPrice], 
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ orderId: this.lastID, finalPrice });
      }
    );
  });
  
  //OIC API (Payment Processing)
  app.post("/payment/process", (req, res) => {
    const { orderId, amount, paymentMethod } = req.body;
    res.json({ status: "Payment Successful", transactionId: `TXN${Math.floor(Math.random() * 10000)}` });
  });
  
  //OIC API (Update Tracking)
  app.post("/tracking/update", (req, res) => {
    const { orderId, status, trackingNumber } = req.body;
    res.json({ message: "Tracking Updated", trackingNumber });
  });

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});