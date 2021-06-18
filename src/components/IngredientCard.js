import React from 'react'

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

  return (
    <div>
      <img src={ingredient.picture} alt={ingredient.name} />
      <h2>
      { ingredient.name }
      </h2>
      <p>{ ingredient.description }</p>
      {badges}
    </div>
  )
}
