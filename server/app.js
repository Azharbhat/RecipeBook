import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import userRouter from "./routes/user-routes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["https://recipe-book-frontend-nu.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// Connect to MongoDB
mongoose.connect("mongodb+srv://azhar:Mongodb%406715@ambcluster.prfsnii.mongodb.net/RecipeBook", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful MongoDB connection
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
