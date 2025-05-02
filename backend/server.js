const express = require('express');
const connectDB = require('./db/db');
const cors = require('cors');

const app = express();
connectDB();
app.use(cors()); // Allow requests from frontend
app.use(express.json());

// Example route
app.get('/api/status', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));
