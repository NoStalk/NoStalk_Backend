import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import refreshRouter from "./routes/refresh";
import leetcodeRouter from "./routes/api/leetcode";
import oAuthRouter from "./routes/oAuth";
import cookieParser from "cookie-parser";
import cors from 'cors';


const PORT = 5000;
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nostalk.yhizah9.mongodb.net/UserDB?retryWrites=true&w=majority`;
const app = express();



mongoose.connect(mongoString);
mongoose.connection.on("error", function (error) {
  console.log(error);
});

mongoose.connection.on("open", function () {
  console.log("🔗 Connected to MongoDB database.");
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}
//TODO configure cors properly
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

app.use('/register', cors(corsOptions), registerRouter);

app.use('/login', cors(corsOptions), loginRouter);

app.use('/refresh', cors(corsOptions), refreshRouter);

app.use('/oauth', cors(corsOptions), oAuthRouter)

app.use('/leetcode', leetcodeRouter);
app.use(cors())

app.listen(PORT, () => {
  console.log(`🌎 Enviroment: ${process.env.NODE_ENV}`);
  console.log(`😏 Front-end URL(configured for cors): ${process.env.FRONTEND_URL}`);
  console.log(`🔌 Port assigned: ${PORT}`);
  console.log(`⚡️ Server is running at ${process.env.BACKEND_URL}`);
});


