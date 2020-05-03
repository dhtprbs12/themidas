import gql from "graphql-tag";

export const GET_COMPANIES = gql`
  query companies($type: String!, $id: Int!, $industry: String!) {
    companies(type: $type, id: $id, industry: $industry) {
      id
		  symbol
		  name
		  industry
	  	description
	  	mission
    }
  }
`