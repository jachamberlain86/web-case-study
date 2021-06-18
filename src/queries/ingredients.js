import {
  gql
} from "@apollo/client";

const ALL_INGREDIENTS = gql`
query Aliments {
  aliments {
    name
    description
    picture
    vegetarian
    vegan
    local
    bio
    preview
    category {
      name
    }
  }
}`

export { ALL_INGREDIENTS }