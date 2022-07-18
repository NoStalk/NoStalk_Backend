import express, { Request, Response } from "express";
import mongoose from "mongoose";

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

app.get("/", function (req, res) {
  res.status(200).send("Hello World!");
});

app.post("/", function (req, res) {
  res.status(200).send({ msg: req.body.msg });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
