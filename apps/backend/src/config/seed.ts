
import 'reflect-metadata'
import dotenv from 'dotenv';
dotenv.config();

import AppDataSource from "./ormconfig";
import {seed }from './create-inital-data';

seed(AppDataSource);


