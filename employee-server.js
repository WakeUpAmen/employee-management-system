'use strict';
const express    = require('express');        
const bodyParser = require('body-parser');

const app        = express();                 

const routerEmployees = require('./employee-router');

const mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin1@ds151180.mlab.com:51180/employment-system');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8888;    



app.get('/', (req, res) => {
                res.json({ message: 'welcome to our home page!' });   
});

app.use('/api', routerEmployees);

app.listen(port, () => {
                console.log('Employment happens on port ' + port)}
);

