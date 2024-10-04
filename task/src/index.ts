import express from "express";
import cors from "cors";
import { dbCreate, AppDataSouce } from "./db";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";
import requestIP from "request-ip-check";
console.log("0)")
const setupServer = async () => {
  console.log("1")
  await dbCreate();
  console.log("_2_'")

  await AppDataSouce.initialize();
  console.log("3")
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routeMiddleware);
  app.use(requestIP.mw());
  app.use("/health", (_req, res) => {
    res.json({ msg: "Hello World" });
  });
  app.use("/api/v1", appRouter);
  app.use(errorHandlerMiddleware);
  console.log("4)")
  const { port } = Env;

  app.listen(port, () => {
    console.log(`Server is listening on ${port}.`);
  });
};

setupServer();
