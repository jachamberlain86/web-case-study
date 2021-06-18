import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import IngredientCard from "./IngredientCard.js";

import { ALL_INGREDIENTS } from "../queries/ingredients.js";

export default function IngredientList() {
  const { loading, error, data } = useQuery(ALL_INGREDIENTS);

  const [search, setSearch] = useState("");
  const [ingredientCards, setIngredientCards] = useState([]);
  const [vegetarianActive, setVegetarianActive] = useState(false);
  const [veganActive, setVeganActive] = useState(false);
  const [localActive, setLocalActive] = useState(false);
  const [bioActive, setBioActive] = useState(false);

  useEffect(() => {
    if (data) {
      updateIngredientCards(data.aliments);
    }
  }, [data, search, vegetarianActive, veganActive, localActive, bioActive]);

  const updateIngredientCards = ingredientsArr => {
    const clonedArr = cloneIngredientsArr(ingredientsArr);
    const searchFilteredArr = search.length
      ? filterBySearch(clonedArr)
      : clonedArr;
    const typesFilteredArr = filterByTypes(searchFilteredArr);
    const updatedCards = typesFilteredArr.map(ingredient => {
      return (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
        ></IngredientCard>
      );
    });
    setIngredientCards(updatedCards);
  };

  const cloneIngredientsArr = ingredientsArr => {
    const clonedArr = ingredientsArr.map(ingredient => {
      const clonedIngredient = {
        ...ingredient,
        category: { ...ingredient.category }
      };
      return clonedIngredient;
    });
    return clonedArr;
  };

  const filterBySearch = ingredientsArr => {
    const regExp = new RegExp(search, "gi");
    const filteredIngredients = ingredientsArr.filter(ingredient => {
      return regExp.test(ingredient.name);
    });
    return filteredIngredients;
  };

  const filterByTypes = ingredientsArr => {
    const filteredIngredients = ingredientsArr.filter(ingredient => {
      let isMatch = true;
      if (vegetarianActive && ingredient.vegetarian !== true) isMatch = false;
      if (veganActive && ingredient.vegan !== true) isMatch = false;
      if (localActive && ingredient.local !== true) isMatch = false;
      if (bioActive && ingredient.bio !== true) isMatch = false;
      return isMatch;
    });
    return filteredIngredients;
  };

  const handleSearchInput = event => {
    setSearch(event.target.value);
  };

  const handleFilterButton = filter => {
    if (filter === "vegetarian") setVegetarianActive(!vegetarianActive);
    if (filter === "vegan") setVeganActive(!veganActive);
    if (filter === "local") setLocalActive(!localActive);
    if (filter === "bio") setBioActive(!bioActive);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div className="ingredient-list__filter-container">
        <input
          type="text"
          placeholder="Search..."
          onChange={event => handleSearchInput(event)}
          className="ingredient-list__search-bar"
        />
        <div className="ingredient-list__button-container">
          <button
            onClick={() => handleFilterButton("vegetarian")}
            className={
              vegetarianActive
                ? "ingredient-list__filter-button--active"
                : "ingredient-list__filter-button"
            }
          >
            Vegetarian
          </button>
          <button
            onClick={() => handleFilterButton("vegan")}
            className={
              veganActive
                ? "ingredient-list__filter-button--active"
                : "ingredient-list__filter-button"
            }
          >
            Vegan
          </button>
          <button
            onClick={() => handleFilterButton("local")}
            className={
              localActive
                ? "ingredient-list__filter-button--active"
                : "ingredient-list__filter-button"
            }
          >
            Local
          </button>
          <button
            onClick={() => handleFilterButton("bio")}
            className={
              bioActive
                ? "ingredient-list__filter-button--active"
                : "ingredient-list__filter-button"
            }
          >
            Bio
          </button>
        </div>
      </div>
      <div className="ingredient-list__main-container">{ingredientCards}</div>
    </div>
  );
}
