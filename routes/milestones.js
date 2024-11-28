const express = require('express');
const db = require('../database/db');
const router = express.Router();

// GET all milestones
router.get('/', (req, res) => {
  db.all('SELECT * FROM Milestones', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

module.exports = router;
