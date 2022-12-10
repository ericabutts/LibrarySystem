const express = require('express')
const axios = require('axios')
const app=express()
const mysql = require('mysql')
const path = require('path');
const port = 8001;
const cors = require('cors');
const bodyParser = require('body-parser');

//import routes

const routes = require('./routes/mainroutes');

//app.use cors, json, url encoded
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/test', (req,res) => {
    var bod = req.body;
    console.log(bod);
    res.json({message:"it worked"})
})

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server connected on port ${port}.`)
})