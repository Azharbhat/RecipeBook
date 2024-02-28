import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blog Found!" });
  }
  return res.status(200).json({ blogs });
};
export const Cake = async (req, res, next) => {
  let blogs;
  try {
    // Query blogs where the 'catagorie' field equals 'cake'
    blogs = await Blog.find({ catagorie: 'Cake' }).populate("user");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
  if (!blogs || blogs.length === 0) {
    return res.status(404).json({ message: "No Blogs Found!" });
  }
  
  return res.status(200).json({ blogs });
};


export const addBlog = async (req, res, next) => {
  const { title, content,catagorie, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return res.status(500).json({ message: "Error finding user" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  let imageToSave = image; // Default to image URL
  const blog = new Blog({
    title,
    content,
    catagorie,
    image: imageToSave,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error saving blog" });
  }

  return res.status(200).json({ blog });
};


export const updateBlog = async (req, res, next) => {
  const { title, content, image } = req.body;

  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
      image,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update Blog" });
  }
  return res.status(200).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No blog found!" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

export const getUserById = async (req, res, next) => {
  let userBlogs;
  try {
    userBlogs = await User.findById(req.params.id).populate("blogs");
  } catch (error) {
    console.log(error);
  }
  if (!userBlogs) {
    return res.status(400).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ user : userBlogs });
};
