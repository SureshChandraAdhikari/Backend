import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config({
    path: './env'
})

connectDB();
// .then( () => {
//   app.listen(process.env.PORT || 8000, () => {
//     console.log(`Server is running at  port : ${process.env.PORT}`);
//   });
// })
// .catch((err) => {
//   console.log("MONGODB connection Failed !!!" , err);
// })
app.listen(process.env.PORT || 8000, function (err) {
  if (err) console.log("MONGODB connection Failed" ,err);
  console.log(`Server is running at  port : ${process.env.PORT}`);
});





/*
import express from "express";
const app = express();


(async () => {
    try {
      await  mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
      app.on("error" , () => {
        console.log("Error: ", error);
        throw error
      })
    
      app.listen( process.env.PORT , () => {
        console.log(`App is listening on port ${process.env.PORT}`)
      })


    }catch(error){
        console.error("ERROR: " , error);
        throw err
    }
})() */