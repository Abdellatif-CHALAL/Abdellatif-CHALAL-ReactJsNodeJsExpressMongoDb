var cors = require('cors')

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv =  require('dotenv');


app.use(cors()) // Use this after the variable declaration

//routes
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');


dotenv.config();

//connect to db
mongoose.connect(
  process.env.DB_CONNECT,{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
  console.log('Database connected Successfully');
}).on('error',function(error) {
  console.log('error is',error);
});


//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/product',productRouter);
app.use('/api/user',authRouter);



app.listen(3000);