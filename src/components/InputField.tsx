import { createStyles, IconButton, InputBase, makeStyles, Paper, Theme } from "@material-ui/core";
import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import { QueryLazyOptions, useLazyQuery } from "@apollo/react-hooks";
import { Company } from "./Search";
import { GET_AUTOCOMPLETE_COMPANIES } from "../query/getAutoCompleteCompanies";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: 30
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
)

type Props = {
  refetch: () => Promise<any>
  id: number
  setId: (id: number) => void
  setCompanyArray: (companyArr: Array<Company>) => void
  inputRef: React.MutableRefObject<HTMLInputElement | null>
}

function InputField(props: Props) {

  const { refetch, id, setId, setCompanyArray, inputRef } = props

  const [getAutoCompleteCompanies, { loading: autoCompleteLoading, data: autoCompleteData }] = useLazyQuery<{ autoCompleteCompanies: Array<Company> }, { name: string }>(GET_AUTOCOMPLETE_COMPANIES, {
    fetchPolicy: 'cache-first',
    onCompleted: (data) => {
      const autoCompleteCompanies = data.autoCompleteCompanies as Array<Company>
      setCompanyArray(autoCompleteCompanies)
    }
  })

  const classes = useStyles();

  const onInput = async (event) => {
    event.preventDefault()
    const value = event.target.value
    if (value === '') {
      if (id !== 0) {
        setId(0)
      }
      await refetch()
    } else {
      getAutoCompleteCompanies({
        variables: {
          name: value
        }
      })
    }
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        onChange={onInput}
        ref={inputRef}
        className={classes.input}
        placeholder="Search a company by name.."
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default InputField;



