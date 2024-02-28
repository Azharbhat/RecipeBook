import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getUserById,
  Cake,
} from "../controllers/blog-controller.js";

const blogRouter = express.Router();
blogRouter.get("/Cake", Cake);
blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserById);

export default blogRouter;
