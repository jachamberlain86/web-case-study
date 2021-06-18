import React from 'react'
import moment from 'moment'

const {REACT_APP_DIGITALOCEAN_SPACE_ALIMENTS} = process.env;

export default function IngredientCard({ingredient}) {

  console.log(ingredient)

  const tags = ['vegetarian', 'vegan', 'local', 'bio']
  const badges = []
  tags.forEach((tag) => {
    if (ingredient[tag]) {
      const badge = <div>{tag}</div>
      badges.push(badge)
    }
  })
  const creationDate = moment(ingredient.createdAt).format('DD/MM/YY')

  return (
    <div>
      <img src={`${REACT_APP_DIGITALOCEAN_SPACE_ALIMENTS}/${ingredient.picture}`} alt={ingredient.name} />
      <h2>
      { ingredient.name }
      </h2>
      <p>{ ingredient.description }</p>
      {badges}
      <p>Created on {creationDate}</p>
    </div>
  )
}
