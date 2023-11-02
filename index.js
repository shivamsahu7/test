const express = require('express')
require('dotenv').config()
const connectDB = require('./config/dbConfig')
const customerRoute = require('./routes/customerRoute')
const app = express()

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/customer',customerRoute)

app.listen(3000,()=>{
    console.log('server started on port no 3000')
})