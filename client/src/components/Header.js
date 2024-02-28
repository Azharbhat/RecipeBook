import React, { useState } from "react";
import { PiListDashesFill } from "react-icons/pi";
import './Header.css'
import { IoIosSearch } from "react-icons/io";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import logo from './../components/images/Cooking-Recipe-PNG-Images.png';

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  const[display,setDisplay]=useState('none')
  const handleclick=()=>{
   if(display=='none'){
    setDisplay('flex')
   }
   else if(!isLoggedIn){
    setDisplay('none')
   }
   else{
    setDisplay('none')
   }
  }
  const[displayy,setDisplayy]=useState('none')
  const handleclickk=()=>{
   if(displayy=='none'){
    setDisplayy('flex')
   }
   else if(!isLoggedIn){
    setDisplayy('none')
   }
   else{
    setDisplayy('none')
   }
  }
 
  return (
    <AppBar
      position="sticky"
      sx={{
        background:'white'
        
      }}
      onMouseLeave={()=>{setDisplay('none')}} 
    >
      <Toolbar>
      <img style={{width:'5rem',height:'5rem'}} src={logo}/>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          style={{ textDecoration: "none" ,color:'rgb(120, 39, 1)'}}
        >
          RecipeBook
        </Typography>
       
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"}>

</Box>

        )}
       
      <button className="btn" onClick={handleclick}><PiListDashesFill /></button>
      </Toolbar>
  {/* for catagories */}
  <div className='catagory'  style={{display:'flex'}}>{isLoggedIn && (
    <>

      
    </>
  )}
  </div>
      
      <div className='auth'  style={{display:display,}}>{isLoggedIn && (
        <>
      <div className="nav" style={{display:display}}>
      <Tab LinkComponent={Link} to="/" label="All Recipes" style={{color:'rgb(120, 39, 1)'}}/>
      <Tab LinkComponent={Link} to="/myRecipes" label="My Recipe " style={{color:'rgb(120, 39, 1)'}}/>
      <Tab LinkComponent={Link} to="/Recipes/add" label="Create Recipe " style={{color:'rgb(120, 39, 1)'}} /></div>
          
        </>
      )}
      </div>
      <div className='auth'  style={{display:display}}>{!isLoggedIn && (
        <>
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
          >
            Sign In
          </Button>
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
          >
            Sign Up
          </Button>
          
        </>
      )}
      {isLoggedIn && (
        
        <Button
          onClick={() => dispatch(authActions.logout())}
          LinkComponent={Link}
          to="/"
          variant="contained"
          sx={{ margin: 1, borderRadius: 10 }}
        >
          Log Out
        </Button>
      )}</div>
    </AppBar>
  );
}

export default Header;
