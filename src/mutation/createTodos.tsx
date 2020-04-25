import gql from "graphql-tag";

export const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
  }
`;
