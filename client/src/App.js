import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Recipes from "./components/Recipes";
import UserRecipes from "./components/UserRecipes";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipe from "./components/AddRecipe";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import { DataProvider } from './components/DataContext';
import DetailsRecipe from "./components/DetailsRecipe";
import Filter from "./components/filter/Filter";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  return (
    <div className="root">
      <React.Fragment >
        <Header />
        <main>
          {/* Wrap the entire Routes with DataProvider */}
          <DataProvider>
            <Routes>
              <Route path="/Cake" element={<Filter />} />
              <Route path="/Tea" element={<Filter />} />
              <Route path="/Veg" element={<Filter />} />
              <Route path="/NonVeg" element={<Filter />} />
              <Route path="/FastFood" element={<Filter />} />
              <Route path="/IceCream" element={<Filter />} />
              <Route path="/" element={<Recipes />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/Recipes/add" element={<AddRecipe />} />
              <Route path="/myRecipes" element={<UserRecipes />} />
              <Route path="/myBlogs/:id" element={<RecipeDetail />} />
              <Route path="/Recipe/:id" element={<DetailsRecipe />} />
            </Routes>
          </DataProvider>
        </main>
      </React.Fragment>
    </div>
  );
}

export default App;
