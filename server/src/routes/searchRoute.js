const express = require('express');
const {searchPosts}  = require('../controller/searchController')

const searchRoute = express.Router();


searchRoute.get("/posts", searchPosts);


module.exports = searchRoute;
