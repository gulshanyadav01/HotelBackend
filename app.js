const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require('dotenv');
const mongoDb = require('./config/db')
const cors = require('cors')
const colors = require('colors')

dotenv.config();

//database
mongoDb();

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/test' , (req, res) => {
    res.send('success')
})

app.use('/admin' , require('./routes/admin'));

app.use('/auth' , require('./routes/auth'));

const Port = process.env.PORT || 5000;




app.listen(Port , () => console.log(`server is running on port ${Port}`.rainbow.bold.underline))




// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });