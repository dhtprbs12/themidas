import gql from "graphql-tag";

export const GET_FEEDBACKS = gql`
  query feedbacks($id: Int) {
    feedbacks(id: $id) {
      id
      firstName
      lastName
      email
      feedback
    }
  }
`