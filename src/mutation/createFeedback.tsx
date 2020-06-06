import gql from "graphql-tag";

export const CREATE_FEEDBACK = gql`
  mutation createFeedback($firstName: String!, $lastName: String!, $email: String!, $feedback: String!) {
    createFeedback(firstName: $firstName, lastName: $lastName, email: $email, feedback: $feedback)
  }
`;
