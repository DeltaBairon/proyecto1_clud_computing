const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(require('cors')());
app.use('/api', apiRoutes);

// Serve static frontend if running in single container
const path = require('path');
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
