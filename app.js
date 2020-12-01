const express = require('express');
require("dotenv").config()
const body = require("body-parser");
const path = require('path')
const router = express.Router();
const app = express();

const PORT = process.env.PORT || 4040
app.use(body.json())

// Middleware

app.use(express.static('public'));
app.use(body.urlencoded({ extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));



app.get("/", (req, res) => {
    res.render('home')
})

app.use('/', router)
require('./routes/weather')(router)


app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
})