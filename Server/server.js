import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import bodyparser from "body-parser";
import Connection from "./DB/db.js";
import Router from "./routes/route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/", Router);
app.options("*", cors());

// // HEROKU deployment setup
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("Client/build"));
// }

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Local PORT & Heroku PORT
const PORT = process.env.PORT || 3000;

// MongoDB URL
const URL =
  process.env.MONGO_DB ||
  `mongodb+srv://${USERNAME}:${PASSWORD}@blogzzmern.ts2fnk7.mongodb.net/`;

app.listen(PORT, () => {
  console.log(chalk.magenta(`Server is rinning on PORT : ${PORT}`));
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Connection(USERNAME, PASSWORD);
Connection(URL);
