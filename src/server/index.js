const express = require('express');
const path = require('path');
const morgan = require('morgan')
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
 const port = process.env.PORT || 8080;


app.use(express.static(path.join(__dirname , '../dist/angular-project')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname , '../dist/angular-project/index.html'));
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname , '../dist/angular-project/index.html'));
});


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://testuser:1111@cluster0.cxpqy.mongodb.net/data?retryWrites=true&w=majority', {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        app.listen(port);
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
}

start();