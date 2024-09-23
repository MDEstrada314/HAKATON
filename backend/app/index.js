import express from "express";
import cors from "cors";
import  dotenv from "dotenv";
import authRoutes from "./routes/auth/auth.routes.js";
import { connectionMongoose } from "./database/connection.mongo.js";
dotenv.config();
connectionMongoose();
const app = express();
const port = process.env.PORT
app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);


app.use("/api/v1/auth", authRoutes);

app.listen(port, ()=> {
    console.log(`Running on Port ${port}`)
})