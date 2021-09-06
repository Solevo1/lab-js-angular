const express = require('express');
const path = require('path');
const morgan = require('morgan')
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 8080

const {usersRouter} = require('./controllers/usersController'); 
const {authRouter} = require('./controllers/authController'); 
const {NodeCourseError} = require('./utils/errors'); 
const { gamesRouter } = require('./controllers/gamesController');

app.use(express.static(path.join(__dirname , '../dist/angular-project')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname , '../dist/angular-project/index.html'));
});
app.use(express.json());
app.use(morgan('tiny'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname , '../dist/angular-project/index.html'));
});
app.use((req, res, next) => {
    res.status(404).json({message: 'Not found'})
});

app.use((err, req, res, next) => {
    if (err instanceof NodeCourseError) {
        return res.status(err.status).json({message: err.message});
    }
    res.status(500).json({message: err.message});
});


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://testuser:1111@cluster0.cxpqy.mongodb.net/data?retryWrites=true&w=majority', {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        app.listen(port);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

start();