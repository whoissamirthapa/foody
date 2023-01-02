import express, { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/db.js";

import Router from "./router/index.js";

const app: Express = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

//route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from server!");
});

app.use("/api", Router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
