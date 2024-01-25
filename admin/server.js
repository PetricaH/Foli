// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Main website routes
app.use('/', express.static('public'));

// Admin panel routes
const adminRoutes = require('./admin/routes/productRoutes');
app.use(adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
