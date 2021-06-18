import {
  gql
} from "@apollo/client";

const ALL_INGREDIENTS = gql`
query Aliments {
  aliments {
    name
  }
}`

export { ALL_INGREDIENTS }