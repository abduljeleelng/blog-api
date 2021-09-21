const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator")
const cors =  require('cors')
require('dotenv').config();
const path = require('path')



const endpoint = require('./app')
const app = express();
app.use(expressValidator());
app.use(cors());
require('@knuckleswtf/scribe-express')(app)


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use("/api/v1", endpoint.user);
app.use("/api/v1", endpoint.post);
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))


// app.use("/api/v1", (req, res)=>{
//     res.json({message:"Version one documentation", doc:""})
// });

app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized!" });
    }
});

module.exports = app;