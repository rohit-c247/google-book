import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import router from "./src/routes/index.js";

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

dotenv.config();
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization"],
};

const app = express();
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch(console.log);

const server = http.createServer(app);

app.use(router);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
