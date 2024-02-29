import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Recipe";

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`recipe-book-api-three.vercel.app/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);


  return (
    <div className="container">
      {" "}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
}

export default UserBlogs;
