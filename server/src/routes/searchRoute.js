const express = require('express');
const {searchPosts, searchUser}  = require('../controller/searchController')

const searchRoute = express.Router();


searchRoute.get("/posts", searchPosts);
searchRoute.get("/user", searchUser);


module.exports = searchRoute;
