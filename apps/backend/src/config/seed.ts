
import AppDataSource from "./ormconfig";
import {seed }from './create-inital-data';
export const initialize = ()=>AppDataSource.initialize()
	.then( async () => {
		console.log("Data source has been initialized");
	   await seed(AppDataSource).then( ()=>{
	    console.log("Initial seed completed.")
	  }).catch((err: Error)=>{console.log("Error during initial seed", err)})
	})
	.catch((err: Error) => {
		console.error("Error during Data Source initialization", err);
	});

export const seedData = async  ()=> await seed(AppDataSource);
