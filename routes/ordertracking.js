const express = require('express');
const db = require('../database/db');
const router = express.Router();

// POST new tracking data
router.post('/', (req, res) => {
  const { OrderNo } = req.body;

  // Fetch milestones and map them to tracking entries
  db.all('SELECT * FROM Milestones', (err, milestones) => {
    if (err) return res.status(500).send(err.message);

    const queries = milestones.map(milestone => ({
      query: `INSERT INTO OrderTracking (OrderNo, Activity, DueDate, Status, LeadTime) VALUES (?, ?, ?, ?, ?)`,
      params: [OrderNo, milestone.Activity, milestone.DueDate, milestone.Status, milestone.LeadTime]
    }));

    // Insert all tracking entries
    queries.forEach(({ query, params }) => {
      db.run(query, params, err => {
        if (err) console.error(err.message);
      });
    });

    res.json({ message: `Tracking data added for order ${OrderNo}` });
  });
});

module.exports = router;
