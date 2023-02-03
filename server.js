require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const ApiError = require("./utils/apiError");
const globalError = require("./controllers/error.controller");

const app = express();

const PORT  = process.env.PORT || 3000;
const dbURL  = process.env.dbURL;

app.use(express.json());
app.use('/users',userRouter);

app.all('*',(req, res, next)=>{
    next(new ApiError(`can't find this route ${req.originalUrl}`, 400))
})

app.use(globalError);

mongoose.connect(dbURL, () => {
    app.listen(PORT, () => {
      console.log('server listening on http://localhost:' + PORT);
      console.log("connected DB");
    });
});

