import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
//const mongoose = require("mongoose");
// console.log(app.get("env"))
import { MongoClient } from "mongodb";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useUniFiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("DB Connection Successfully");
  });




// //console.log(process.env)
const port = process.env.PORT || 3033;
app.listen(port, () => {
  console.log(`Server läuft in Port..........3033`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
});
