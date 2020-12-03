const express = require('express');
const ejs = require('ejs')
require("dotenv").config()
const body = require("body-parser");
const path = require('path')
const router = express.Router();
const app = express();

const PORT = process.env.PORT || 4040
app.use(body.json())

// Middleware

app.use(body.urlencoded({ extended: true}));

// -------------------------------
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'view'));
// ------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', 'views');



app.get("/", (req, res) => {
    res.render('home')
})
app.get("/check",(req, res)=>{
    res.send("welcome to waether check")
    
})

app.use('/', router)
require('./routes/weather')(router)


app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
})
