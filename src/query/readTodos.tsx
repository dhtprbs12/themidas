import gql from "graphql-tag";
export const READ_TODOS = gql`
  query todos {
    todos {
      id
      text
      completed
    }
  }
`;
