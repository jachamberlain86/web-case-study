import React from 'react'
import {
  useQuery
} from "@apollo/client";

import IngredientCard from './IngredientCard.js'

import {mockData} from '../queries/mockData'

import { ALL_INGREDIENTS } from '../queries/ingredients.js'

export default function IngredientList() {
  const { loading, error, data } = useQuery(ALL_INGREDIENTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: { error.message }</p>

  console.log(data.aliments.preview)



  const ingredientCards = data.aliments.map((ingredient) => {
    return (
      <IngredientCard key={ingredient.id} ingredient={ingredient}></IngredientCard>
    )
  })


  return (
    <div>

    {ingredientCards}

    </div>
  )
}
