import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  InputLabel,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const labelStyle = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
};

const AddRecipe = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    catagorie:'',
    image: '',
  });
  const [imgs, setImg] = useState('');

const handleImage = (event) => {
  const file = event.target.files[0]; // Get the selected file
  const reader = new FileReader();

  reader.onload = () => {
    setImg(reader.result); // Set the preview image
    setInputs((prevValue) => ({
      ...prevValue,
      image: reader.result, // Set the image data to state
    }));
  };

  reader.readAsDataURL(file); // Read the file content as Data URL
};
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios.post("recipe-book-api-three.vercel.app/api/blog/add", {
      title: inputs.title,
      content: inputs.content,
      catagorie:inputs.catagorie,
      image: inputs.image,
      user: localStorage.getItem("userId"),
    }).catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/"));
  };

  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <form onSubmit={handleSubmit}>
        
        <div >
          <Typography
            fontWeight={"bold"}
            padding={1}
            color="gray"
            variant="h4"
            textAlign={"center"}
          >
            Create your Recipe
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            variant="outlined"
            style={{width:'100%'}}
          />
          <InputLabel sx={labelStyle}>Steps</InputLabel>
          <TextField
            name="content"
            onChange={handleChange}
            value={inputs.content}
            style={{width:'100%'}}
            variant="outlined"
          />
          
          <InputLabel sx={labelStyle}>Catagorie</InputLabel>
          <TextField
            name="catagorie"
            onChange={handleChange}
            value={inputs.catagorie}
            style={{width:'100%'}}
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Image URL</InputLabel>
          <input  type="file" onChange={handleImage} /> {/*imagee        */}<br></br>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            variant="outlined"
          />
          <Button
            sx={{ borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Upload Recipe
          </Button>
          </div>
      </form>
    </div>
  );
};

export default AddRecipe;
