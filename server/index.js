const express = require('express');
const authRoute = require('./src/routes/authRoute');
const postRoute = require('./src/routes/postRoutes')
const app = express();
const dbConfig = require('./src/config/dbconfig')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors')



function check(req,res,next){console.log(req.body); next();}


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());
dbConfig.connect()

app.use('/auth', check ,authRoute);
app.use('/post', postRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3001, () => {
    console.log('Server is running on port 3000');
});
