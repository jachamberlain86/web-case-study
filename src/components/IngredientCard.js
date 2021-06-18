import React from "react";
import moment from "moment";

const { REACT_APP_DIGITALOCEAN_SPACE_ALIMENTS } = process.env;

// TODO: Need to handle when image is not retrieved correctly

export default function IngredientCard({ ingredient }) {
  const tags = ["vegetarian", "vegan", "local", "bio"];
  const badges = [];

  tags.forEach(tag => {
    if (ingredient[tag]) {
      const badge = (
        <div key={tag} className="ingredient-card__badge">
          {tag}
        </div>
      );
      badges.push(badge);
    }
  });

  const creationDate = moment(ingredient.createdAt).format("DD/MM/YY");

  return (
    <div className="ingredient-card__main-container">
      <img
        src={`${REACT_APP_DIGITALOCEAN_SPACE_ALIMENTS}/${ingredient.picture}`}
        alt={ingredient.name}
        className="ingredient-card__image"
      />
      <div className="ingredient-card__content-container">
        <h2 className="ingredient-card__title">{ingredient.name}</h2>
        <p className="ingredient-card__body">{ingredient.description}</p>
      </div>
      <div className="ingredient-card__badge-container">{badges}</div>
      <div className="ingredient-card__date-container">
        <p className="ingredient-card__body--date ">
          Created on {creationDate}
        </p>
      </div>
    </div>
  );
}
