import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Blog from "./Recipe";
import { IoIosSearch } from "react-icons/io";
import './Recipes.css';


function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState([]);
  const [index, setIndex] = useState(0);
  const [filterData,setfilterData]=useState('')
  const[serch,Setserch]=useState('')
  const [sliderValue, setSliderValue] = useState(0);


  const fetchDataa = async () => {
      try {
        const res = await axios.get("recipe-book-api-three.vercel.app/api/blog");
        
        const data = res.data;
        setBlogs(data?.blogs);
        console.log(data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blog");
        
        const data = res.data;
        setBlogs(data?.blogs);
        console.log(data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);
  

  useEffect(() => {
    if (blogs.length > 0) {
      const imageUrls = blogs.map(blog => blog.image);
      setImgUrl(imageUrls);
    }
  }, [blogs]);

  useEffect(() => {
    if (imgUrl.length > 0) {
      const interval = setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % imgUrl.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [imgUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handlecatagorie = (category) => {
    setBlogs(blogs.filter(item => item.catagorie === category));

}
const allrecipe=()=>{
  
fetchDataa();
}

const handleSearch=(e)=>{Setserch(e.target.value)}
const handleButton=(e)=>{ setBlogs(blogs.filter(item => item.catagorie === serch));
  Setserch('')}
  //
  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    // Add more image URLs as needed
  ];

  // Function to handle slider change
  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  // Use useEffect to trigger auto changing of images
  
  return (
    <div>
    <div className="btndiv">
    <button className="btn" onClick={()=>handlecatagorie("Veg")}>Veg</button>
    <button className="btn"  onClick={()=>handlecatagorie("NonVeg")}>NonVeg</button>
    <button className="btn"  onClick={()=>handlecatagorie("FastFood")}>FastFood</button>
    <button className="btn"  onClick={()=>handlecatagorie("Tea")}>Tea</button>
    <button className="btn"  onClick={()=>handlecatagorie("Cake")}>Cake</button>
    <button className="btn"  onClick={()=>handlecatagorie("IceCream")}>IceCream</button>
    <div className="srch"><input type="text" value={serch} onChange={handleSearch} style={{ width: '30%', height: '1.5rem', borderRadius: '0.1rem', borderColor: 'orange' }} />
        <button
        style={{
          marginLeft: '0.1rem',
          height: '1.5rem',
          borderRadius: '0.1rem',
          backgroundColor: 'orange',
          border: 'none',
          transition: 'background-color 0.3s ease', // Add transition for smooth effect
        }}
       
        onClick={handleButton}
      >
        <IoIosSearch  />
      </button>
            </div>
</div>
     
      <div className="lander">
        <div className="left-subLander">
         
        <h1 style={{fontFamily:'sans-serif',fontSize:'3rem',color:'orange'}}>Recently</h1> <h1 style={{fontFamily:'sans-serif',fontSize:'3rem'}}>Added Recipe's</h1>
          <p className="para" style={{fontFamily:'sans-serif',fontSize:'large'}}>Explore New Horizons
        Dive into our diverse selection of recipes and embark on a journey through the tantalizing landscapes of taste. From hearty soups to decadent desserts, each recipe invites you to explore new ingredients, techniques, and cultural influences.</p>
        </div>
        {imgUrl.length > 0 && (
        <div className="right-subLander"><img className="movImg" src={imgUrl[index]} alt="slider" /></div>  
        )}
      </div>
      <button className="btn" onClick={allrecipe}><h1>All Recipies</h1></button>
     
      <div className="container">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <Link
              to={{
                pathname: `/Recipe/${blog._id}`
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
      <div>
      <input 
        type="range" 
        min="0" 
        max={images.length - 1} 
        value={sliderValue} 
        onChange={handleSliderChange} 
      />
      <div>
        <img src={images[sliderValue]} alt={`Image ${sliderValue}`} />
      </div>
    </div>
    </div>
  );
}

export default Blogs;
