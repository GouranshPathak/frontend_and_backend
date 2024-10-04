const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// CORS settings
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Frontend origin (adjust if different)
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// MongoDB connection
const dbURI = 'mongodb://localhost:27017/sereneIndore';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Defining schema and model
const placeSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String
});
const Place = mongoose.model('Place', placeSchema);

// API route to get all historical places
app.get('/historical-places', async (req, res) => {
    try {
        const places = await Place.find({});
        res.json(places);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch places' });
    }
});

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Welcome to Serene Indore Backend');
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// API route to get all historical places
app.get('/historical-places', async (req, res) => {
    try {
        const places = await Place.find({});
        res.json(places);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch places' });
    }
});

// API route to get a historical place by ID
app.get('/historical-places/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.json(place);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch place' });
    }
});
