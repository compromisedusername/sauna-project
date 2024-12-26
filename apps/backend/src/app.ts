import express, { Express, Request, Response } from "express";
import AppDataSource from "./config/ormconfig";

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;



app.get("/", (req: Request, res: Response) => {
 res.end(JSON.stringify({Response: "Server listening"}));
});




AppDataSource.initialize()
 .then(() => {
  console.log("Connected to database.")
  app.listen(port, async () => {
   console.log(`Server is listening on port ${port}`);
  });
 })
 .catch((err) => {
  console.error("Error during database connection", err);
 });
