import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowRedoOutline } from "react-icons/io5";
import './DetailsRecipe.css'

const DetailsRecipe = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`recipe-book-api-three.vercel.app/api/blog/${id}`);
        setBlog(response.data.blog);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m">  
    
  <img src={blog.image} style={{ width: '40%', height: '30%', margin: '1rem', borderRadius: '0.5rem' }} alt="Blog Image" />
  <div className="content">
    <h2>{blog.title}</h2>
    {blog.content.split('.').map((sentence, index) => (
      <p key={index} style={{ fontSize: 'large', lineHeight: '2rem' }}>
      <IoArrowRedoOutline /> {sentence.trim()}.
      </p>
    ))}
  </div>      
</div>

  );
};

export default DetailsRecipe;
