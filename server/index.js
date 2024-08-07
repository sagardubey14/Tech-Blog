const express = require('express');
const authRoute = require('./src/routes/authRoute');
const postRoute = require('./src/routes/postRoutes')
const app = express();
const dbConfig = require('./src/config/dbconfig')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors');
const searchRoute = require('./src/routes/searchRoute');
const updateRoute = require('./src/routes/updateRoute');
require('dotenv').config();


const stopwords = ['how', 'to', 'and', 'or', 'javascript', 'in'];
function removeStopwords(req, res, next) {
    const {query,username} = req.query;
    if(query){
    const words = query.toLowerCase().split(' ');

    const filteredWords = words.filter(word => !stopwords.includes(word));
    
    req.query = {keys:filteredWords, query:query}
    }
    next();
}

const allowedOrigins = process.env.REACT_URL.split(',');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());
dbConfig.connect()

app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/update', updateRoute);
app.use('/search',removeStopwords, searchRoute)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3001');
});
