import express from "express";
import cors from "cors";
import  dotenv from "dotenv";
import authRoutes from "./routes/auth/auth.routes.js";
import usersRoutes from "./routes/users/users.routes.js";
import { connectionMongoose } from "./database/connection.mongo.js";
dotenv.config();
connectionMongoose();
const uri = "/api/v1";
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


app.use(uri, authRoutes);
app.use(uri, usersRoutes);


app.listen(port, ()=> {
    console.log(`Running on Port ${port}`)
})