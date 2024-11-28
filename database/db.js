const sqlite3 = require('sqlite3').verbose();
const path = require('path');
console.log("i am in");

//const dbPath = 'factory.db';
const db = new sqlite3.Database('./newfactory.db');
console.log(db);
//console.log(dbPath);
// Initialize database tables
db.serialize(() => {
  // Create Orders table
  db.run(`CREATE TABLE IF NOT EXISTS Orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Season TEXT,
    Style TEXT,
    OrderNo TEXT UNIQUE,
    Buyer TEXT,
    Qty INTEGER,
    Type TEXT,
    ExFacDate TEXT,
    Status TEXT,
    Owner TEXT
  )`);

  // Create Milestones table
  db.run(`CREATE TABLE IF NOT EXISTS Milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Activity TEXT,
    DueDate TEXT,
    Status TEXT,
    LeadTime INTEGER
  )`);

  // Create OrderTracking table
  db.run(`CREATE TABLE IF NOT EXISTS OrderTracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderNo TEXT,
    Activity TEXT,
    DueDate TEXT,
    Status TEXT,
    LeadTime INTEGER
  )`);
});

module.exports = db;
