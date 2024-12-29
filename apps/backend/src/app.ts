import express, { Express, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
// todo ADD EXPRESS-VALIDATOR

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger-config";

import AppDataSource from "./config/ormconfig";

import { errorHandler } from "./middlewares/error-handler.middleware";
import { loggingMiddleware } from "./middlewares/log.middleware";
import userRoutes from "./routes/user.routes";
import {
  BasicResponse,
  NotFoundResponse,
  OkResponse,
} from "./dto/response/responses.response";
import saunaRoutes from "./routes/sauna.routes";

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

//middlewares config
app.use(cors());
app.use(express.json());
// middlewares config
//app.use(loggingMiddleware);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", userRoutes);
app.use("/api", saunaRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json(new OkResponse());
});

app.get("*", (req: Request, res: Response) => {
  res.json(new NotFoundResponse(req.path));
});
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);

  AppDataSource.initialize()
    .then(async () => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.error("Error during database connection", err);
    });
});
