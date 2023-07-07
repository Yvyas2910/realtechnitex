import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sizeRoutes from "./routes/sizeRoute.js";
import colourRoutes from "./routes/colourRoutes.js";
import orderItemRoutes from "./routes/orderItemsRoutes.js";
import userRoter from "./routes/userRoter.js";

import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";

//configure environment variables
dotenv.config();

//database configuration
connectDB();

//es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/colour", colourRoutes);
app.use("/api/v1/size", sizeRoutes);
app.use("/api/v1/order", orderItemRoutes);
app.use("/api/v1/user", userRoter);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`.bgCyan.white);
});
