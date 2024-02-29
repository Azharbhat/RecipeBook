import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
app.use(cors({
  origin:["https://RecipeBook.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 8000;

mongoose
  .connect("mongodb+srv://azhar:Mongodb%406715@ambcluster.prfsnii.mongodb.net/RecipeBook", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected To Database and listening at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
