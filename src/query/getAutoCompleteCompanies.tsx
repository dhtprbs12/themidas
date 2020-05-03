import gql from "graphql-tag";

export const GET_AUTOCOMPLETE_COMPANIES = gql`
  query autoCompleteCompanies($name: String!) {
    autoCompleteCompanies(name: $name) {
      id
		  symbol
		  name
		  industry
	  	description
	  	mission
    }
  }
`