const cors = require('cors')
const express = require("express");
require("dotenv").config();
const Port = process.env.PORT || 3000;
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require('./routes/cart.routes');

const server = express();

server.use(cors())
server.use(express.json());
server.use("/user", userRouter);
server.use("/product", productRouter);
server.use('/cart', cartRouter)

server.get("/", (_, res) => {
  res.status(200).send("Health check done, Server is Running.");
});

server.listen(Port, async () => {
  try {
    await connection;
    console.log(`Server is Running and DB is Connected ${Port}`);
  } catch (error) {
    console.log(error.message);
  }
});