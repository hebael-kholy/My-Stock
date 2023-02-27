require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/gategory.routes");
const productRouter = require("./routes/prodcut.routes");
const CartRouter = require("./routes/cart.routes");
const reviewRouter = require("./routes/review.routes");
const orderRouter = require("./routes/order.routes");
const wishlistRouter = require("./routes/wishlist.routes");
const forgetRouter = require("./routes/forgetpass.routes");

const ApiError = require("./utils/apiError");
const globalError = require("./controllers/error.controller");


const app = express();

const PORT  = process.env.PORT || 3000;
const dbURL = process.env.dbURL;
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
  ],
}

/*
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'EcommerceITI API',
      description:"ecommerce iti api information",
      contact:{
        name:"MY Amazing Developer",
      },
      servers:["http://localhost:8080"]
    }
  },
  apis: ['.routes/*.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));*/

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('images'))

// /**
//  * @swagger
//  * /user:
//  *  get:
//  *    description: Get all users
//  *    responses:
//  *      '200':
//  *        description: OK
// */


app.use('/users',userRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);
app.use('/cart',CartRouter);
app.use('/review',reviewRouter);
app.use('/order',orderRouter);
app.use('/wishlist',wishlistRouter);
app.use('/forgetpass',forgetRouter);


app.all('*',(req, res, next)=>{
    next(new ApiError(`can't find this route ${req.originalUrl}`, 400))
})


app.use(globalError);

mongoose.connect(dbURL, () => {
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });
});

//local database
/*
 mongoose.connect(process.env.DB).then( ()=> {
   console.log("connected to databse succesfully")
 });
 app.listen(PORT, () => {
         console.log(`server listening on http://localhost:${PORT}`);
   });*/

