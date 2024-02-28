import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Import useParams
import Blog from "../Recipe";
import { IoIosSearch } from "react-icons/io";
import '../Recipe.css';

function Filter() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams(); // Use useParams to access the category parameter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/blog/${category}`);
        const data = res.data;
        setBlogs(data?.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  
    fetchData();
  }, [category]); // Make sure to include 'category' in the dependency array
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <Link
              to={{
                pathname: `/blog/${blog._id}`
              }}
            >
              <Blog
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user._id}
                title={blog.title}
                content={blog.content}
                image={blog.image}
                userName={blog.user.name}
                type={'home'}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
