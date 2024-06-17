const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handling
app.use('/', require('./routes'));

// Initialize the database and start the server
mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    } else {
        app.listen(port, () => {
            console.log(`Database connected and server running on port ${port}`);
        });
    }
});
