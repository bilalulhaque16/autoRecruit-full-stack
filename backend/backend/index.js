import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
// import connectDB from "./src/db/connection.db.js";
import {connectAllDb} from "./src/db/connectionManager.config.js";
import app_route from "./src/route/app.router.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const app = express();
app.use(cors())
app.use(express.json());

// const port = process.env.PORT || 3001;
const port = process.env.PORT || 3002;

connectAllDb();

app_route(app)


app.listen(port, function(){
    console.log("App is running on port " + port);
})