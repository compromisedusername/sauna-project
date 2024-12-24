require('dotenv').config()
import 'reflect-metadata'

import { AppDataSource, initialize} from './config/ormconfig';

initialize();

