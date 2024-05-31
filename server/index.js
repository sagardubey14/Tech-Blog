const express = require('express');
const authRoute = require('./src/routes/authRoute');
const app = express();
const dbConfig = require('./src/config/dbconfig')

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
dbConfig.connect()
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
