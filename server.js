const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoute");
const postRoute = require("./Routes/postRoute");
const commentRoute = require("./Routes/commentRoute");
const likeRoute = require("./Routes/likeRoute");
const app = express();
app.use(express.json());
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

const connectToDB = async () => {
  res = await mongoose.connect(process.env.MONGODB_URI);
  if (res) console.log("db connected");
};
connectToDB();

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use(commentRoute);
app.use(likeRoute);

app.listen(8080, console.log("your server is running on port 8080"));
