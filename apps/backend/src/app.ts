import 'reflect-metadata'
import express from 'express';


import { initialize, seedData} from './config/seed';


const app = express();
app.listen(3000, async () => {
 console.log('App listening on port 3000');


})
