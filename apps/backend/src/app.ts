import 'reflect-metadata'
import dotenv from 'dotenv';
import express, {Express, Request, Response} from 'express';

dotenv.config();




const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(3000, async () => {
 console.log('App listening on port 3000');


})
