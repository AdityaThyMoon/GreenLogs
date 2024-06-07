import express from "express";
import mongoose from "mongoose";
import plantsRoute from "./routes/plantsRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path:'./setup.env'});
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use("/plants", plantsRoute);

const uri = process.env.ATLAS_URI

mongoose
    .connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
        console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
