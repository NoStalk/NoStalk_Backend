import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import refreshRouter from "./routes/refresh";
import cookieParser from "cookie-parser";


const PORT = 5000 ;
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nostalk.yhizah9.mongodb.net/UserDB?retryWrites=true&w=majority`;
const app = express();

mongoose.connect(mongoString);
mongoose.connection.on("error", function (error) {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
});

mongoose.connection.on("open", function () {
  console.log("Connected to MongoDB database.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/**
 * Routes
 * The .use() method takes a path and a callback function.
 * The callback function is executed when the path is matched.
 * The callback function takes a Request object and a Response object as parameters.
 * The callback function returns a Promise.
 */
app.get("/", function (req, res) {
  res.status(200).send("Hello World!");
  console.log(req.params);
});

app.use('/register', registerRouter);

app.use('/login', loginRouter);

app.use('/refresh', refreshRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


