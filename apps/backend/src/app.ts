import express, { Express, Request, Response } from "express";
import cors from 'cors';

import AppDataSource from "./config/ormconfig";
import userRoutes from "./routes/user.routes";

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;
//middlewares config

app.use(cors());
app.use(express.json());
//app.use(errorHandler);
// middlewares config


app.use('/api', userRoutes);

app.get("/", (req: Request, res: Response) => {
 res.json({Response: "OK"});
});




AppDataSource.initialize()
 .then( async () => {
  console.log("Connected to database.")
  app.listen(port, async () => {
   console.log(`Server is listening on port ${port}`);
  });
 })
 .catch((err) => {
  console.error("Error during database connection", err);
 });
