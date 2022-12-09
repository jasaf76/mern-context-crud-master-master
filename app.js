import express from "express";
import morgan from "morgan";
import AppError from "./server/utils/appError.js";
import globalErrorHandler from "./server/controllers/errorController.js";
import nftsRouter from "./server/routes/nftsRoute.routes.js";

import usersRouter from "./server/routes/usersRoute.js";

const app = express();
app.use(express.json());

app.use(morgan("dev"));
//SERVING TEMPLATE DEMO
//app.use(express.static(`${__dirname}/nft-data/img`));

//Custom Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,OPTIONS,DELETE,UPDATE,PATCH"
  );
  res.header("Allow", "GET, POST, PUT,OPTIONS,DELETE,UPDATE,PATCH");
 
  console.log("salio bien la cosa 🐶");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//ROUTER NFTs

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);
///--ERROR SECTION
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Es kann nicht  ${req.originalUrl} gefunden werden von dieser Server`,
  // });
  next(
    new AppError(
      `Es kann nicht  ${req.originalUrl} gefunden werden von dieser Server`,
      404
    )
  );
});
///--Global error handel
app.use(globalErrorHandler);
export default app;
