import express, { Express, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
// todo ADD EXPRESS-VALIDATOR

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger-config";

import AppDataSource from "./config/ormconfig";

import { errorHandler } from "./middlewares/error-handler.middleware";
import { loggingMiddleware } from "./middlewares/log.middleware";
import { requireAuthorization } from "./middlewares/requireAuth.middleware";
import { ResponseFactory } from "./dto/response/response-factory.response";

import userRoutes from "./routes/user.routes";
import saunaRoutes from "./routes/sauna.routes";
import roleRoutes from "./routes/role.routes"
import reservationRoutes from "./routes/reservation.routes"


const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

//middlewares config
app.use(cors({origin: "http://localhost:3000",credentials: true}));
app.use(express.json());
//app.use(requireAuthorization())
// middlewares config
//app.use(loggingMiddleware);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", reservationRoutes)
app.use("/api", userRoutes);
app.use("/api", saunaRoutes);
app.use("/api", roleRoutes)
app.get("/", (req: Request, res: Response) => {
    ResponseFactory.ok(res, "Server listening")
});

app.get("*", (req: Request, res: Response) => {
  (ResponseFactory.notFound(res, req.path));
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
