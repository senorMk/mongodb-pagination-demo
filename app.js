import express from 'express';
import User from './model.js';
import paginatedResponse from './middleware/paginatedResponse.js';

const app = express();

app.use(express.static('static'));

// Method 1: Paginate for each route
app.get('/', (req, res) => {
  User.getAll(req, res);
});

// Method 2: Custom Middleware for all routes
app.get('/users', paginatedResponse(User), (req, res) => {
  res.status(200).json(res.paginatedData);
});

// Method 3: Aggregate pipeline for each route
app.get('/agg', (req, res) => {});

export default app;
