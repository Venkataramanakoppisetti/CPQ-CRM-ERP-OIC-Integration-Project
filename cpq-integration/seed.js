const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./cpq.db");

// Sample Products (Laptops, Mobiles, Accessories)
const products = [
  { model: "Dell XPS 13", basePrice: 110000 },
  { model: "Dell XPS 15", basePrice: 120000 },
  { model: "MacBook Air M2", basePrice: 140000 },
  { model: "MacBook Pro 14", basePrice: 180000 },
  { model: "MacBook Pro 16", basePrice: 200000 },
  { model: "HP Spectre x360", basePrice: 115000 },
  { model: "HP Envy 13", basePrice: 90000 },
  { model: "Lenovo ThinkPad X1", basePrice: 130000 },
  { model: "Asus ROG Zephyrus", basePrice: 160000 },
  { model: "Asus ZenBook 14", basePrice: 85000 },
  { model: "iPhone 13", basePrice: 70000 },
  { model: "iPhone 14", basePrice: 80000 },
  { model: "Samsung Galaxy S23", basePrice: 75000 },
  { model: "Samsung Galaxy Z Fold 4", basePrice: 180000 },
  { model: "Google Pixel 7", basePrice: 65000 },
  { model: "OnePlus 11", basePrice: 60000 },
  { model: "Xiaomi 13 Pro", basePrice: 58000 },
  { model: "Sony WH-1000XM5", basePrice: 35000 },
  { model: "Bose QuietComfort 45", basePrice: 33000 },
  { model: "AirPods Pro 2", basePrice: 25000 },
  { model: "Samsung Galaxy Buds 2 Pro", basePrice: 20000 },
  { model: "JBL Flip 6", basePrice: 10000 },
  { model: "Apple Watch Series 8", basePrice: 50000 },
  { model: "Samsung Galaxy Watch 5", basePrice: 40000 },
  { model: "Garmin Fenix 7", basePrice: 60000 },
  { model: "iPad Pro 12.9", basePrice: 120000 },
  { model: "Samsung Galaxy Tab S8", basePrice: 85000 },
  { model: "Dell UltraSharp Monitor", basePrice: 45000 },
  { model: "LG OLED 55-inch", basePrice: 130000 },
  { model: "Sony Bravia XR 65", basePrice: 160000 }
];

// Sample Customers
const customers = [
  { id: "CUST001", name: "Rajesh Kumar", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST002", name: "Priya Sharma", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST003", name: "Amit Verma", loyaltyLevel: "Platinum", discountPercentage: 15 },
  { id: "CUST004", name: "Neha Gupta", loyaltyLevel: "Bronze", discountPercentage: 3 },
  { id: "CUST005", name: "Vikram Singh", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST006", name: "Pooja Nair", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST007", name: "Manoj Yadav", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST008", name: "Ananya Dutta", loyaltyLevel: "Platinum", discountPercentage: 15 },
  { id: "CUST009", name: "Kunal Mehta", loyaltyLevel: "Bronze", discountPercentage: 3 },
  { id: "CUST010", name: "Riya Sen", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST011", name: "Arjun Malhotra", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST012", name: "Sneha Iyer", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST013", name: "Sandeep Reddy", loyaltyLevel: "Platinum", discountPercentage: 15 },
  { id: "CUST014", name: "Megha Kapoor", loyaltyLevel: "Bronze", discountPercentage: 3 },
  { id: "CUST015", name: "Naveen Patil", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST016", name: "Aishwarya Rao", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST017", name: "Rohan Joshi", loyaltyLevel: "Platinum", discountPercentage: 15 },
  { id: "CUST018", name: "Tanvi Saxena", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST019", name: "Harish Menon", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST020", name: "Varsha Kulkarni", loyaltyLevel: "Bronze", discountPercentage: 3 },
  { id: "CUST021", name: "Dhruv Chopra", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST022", name: "Simran Kaur", loyaltyLevel: "Platinum", discountPercentage: 15 },
  { id: "CUST023", name: "Aditya Narayan", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST024", name: "Sanya Bhatia", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST025", name: "Rahul Trivedi", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST026", name: "Kritika Ahuja", loyaltyLevel: "Platinum", discountPercentage: 15 },
  { id: "CUST027", name: "Yash Gupta", loyaltyLevel: "Bronze", discountPercentage: 3 },
  { id: "CUST028", name: "Sakshi Tiwari", loyaltyLevel: "Silver", discountPercentage: 5 },
  { id: "CUST029", name: "Ankit Sharma", loyaltyLevel: "Gold", discountPercentage: 10 },
  { id: "CUST030", name: "Divya Nambiar", loyaltyLevel: "Platinum", discountPercentage: 15 }
];

// Insert Products into Database
products.forEach(product => {
  db.run("INSERT INTO Products (model, basePrice) VALUES (?, ?)", [product.model, product.basePrice]);
});

// Insert Customers into Database
customers.forEach(customer => {
  db.run(
    "INSERT INTO Customers (id, name, loyaltyLevel, discountPercentage) VALUES (?, ?, ?, ?)",
    [customer.id, customer.name, customer.loyaltyLevel, customer.discountPercentage]
  );
});

console.log("✅ 30 Sample Products & Customers Inserted!");
db.close();
