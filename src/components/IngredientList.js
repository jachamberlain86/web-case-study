import React from 'react'
import {
  useQuery
} from "@apollo/client";

import { ALL_INGREDIENTS } from '../queries/ingredients.js'

export default function IngredientList() {
  const { loading, error, data } = useQuery(ALL_INGREDIENTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: { error.message }</p>

  console.log(data)

  return (
    <div>

    </div>
  )
}
