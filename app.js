const express = require('express');
const app = express();
require('dotenv').config();

const userRoute = require('./routes/index');
const {connectDB} = require('./db/connect');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: {maxAge: 1000 * 60 * 60 * 24} // Valid for 24 hours
}))

app.use(flash());

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

app.use(userRoute);

const port = 5000;
const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is running at port ${port}`));
    }
    catch(error){
        console.log(error);
    }
}
start();