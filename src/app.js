const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ['http://localhost:8080', 'https://rambhub.vercel.app']
}));

const transactionsRoutes = require('./routes/transactionsRoutes');

const port = process.env.PORT || 3002;
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error:', error));

app.use(express.json());
app.use('/api/transactions', transactionsRoutes);

app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}`);
});