import React, { useState, useEffect } from 'react'
import {
  useQuery
} from "@apollo/client";

import IngredientCard from './IngredientCard.js'

import {mockData} from '../queries/mockData'

import { ALL_INGREDIENTS } from '../queries/ingredients.js'

export default function IngredientList() {
  const { loading, error, data } = useQuery(ALL_INGREDIENTS)

  const [ search, setSearch ] = useState('');
  const [ ingredients, setIngredients ] = useState([])

  useEffect(() => {
    if (search.length) {
      const ingredientsArr = ingredients.map((ingredient) => {
        const clonedIngredient = { ...ingredient, category: { ...ingredient.category } }
        return clonedIngredient;
      })
      const regExp = new RegExp( search, 'gi' )
      const filteredIngredients = ingredientsArr.filter((ingredient) => {
        return regExp.test(ingredient.name)
      })
      setIngredients(filteredIngredients)
    } else {
      if (data) setIngredients(data.aliments)
    }
  }, [search])

  useEffect(() => {
    if (data) setIngredients(data.aliments)
  }, [data])


  const ingredientCards = ingredients.map((ingredient) => {
    return (
      <IngredientCard key={ingredient.id} ingredient={ingredient}></IngredientCard>
    )
  })

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: { error.message }</p>
  return (
    <div>
    <input type="text" placeholder='Search...' onChange={(event) => handleSearchInput(event)}/>
    <div className='ingredient-list__container'>
    {ingredientCards}
    </div>
    </div>
  )
}
