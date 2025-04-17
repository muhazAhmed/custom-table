import express from "express";
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 8800;
import { DB } from "./utils/db.js";
import dotenv from "dotenv";
import route from "./routes/routes.js";

app.use(cors());
app.use(express.json());
dotenv.config();
DB(process.env.DB);
app.use("/api", route);

app.listen(PORT, () => console.log("Server Connected to " + PORT + " ✅"));
