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

// -------------------------------
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'view'));
// ------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(body.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



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
