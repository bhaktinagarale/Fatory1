const express = require('express');
const bodyParser = require('body-parser');
const ordersRouter = require('./routes/orders');
const milestonesRouter = require('./routes/milestones');
const orderTrackingRouter = require('./routes/ordertracking');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// API routes
app.use('/api/orders', ordersRouter);
app.use('/api/milestones', milestonesRouter);
app.use('/api/ordertracking', orderTrackingRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
