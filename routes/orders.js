const express = require('express');
const db = require('../database/db');
const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
  db.all('SELECT * FROM Orders', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// POST new order
router.post('/', (req, res) => {
  const { Season, Style, OrderNo, Buyer, Qty, Type, ExFacDate, Status, Owner } = req.body;

  const query = `INSERT INTO Orders (Season, Style, OrderNo, Buyer, Qty, Type, ExFacDate, Status, Owner)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(query, [Season, Style, OrderNo, Buyer, Qty, Type, ExFacDate, Status, Owner], function (err) {
    if (err) return res.status(500).send(err.message);

    // Respond with the newly created order's ID
    res.json({ id: this.lastID, OrderNo });
  });
});

module.exports = router;
