import {
  gql
} from "@apollo/client";

const ALL_INGREDIENTS = gql`
query Aliments {
  aliments {
    name
    description
    picture
    createdAt
    vegetarian
    vegan
    local
    bio
    category {
      name
    }
  }
}`

export { ALL_INGREDIENTS }