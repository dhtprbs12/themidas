import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/Info'
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import TimelineIcon from '@material-ui/icons/Timeline';

type Props = {
  name: string
  symbol: string
  industry: string
  companyClick: (name: string, symbol: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      maxHeight: 200,
      overflow: 'auto',
    },
  }),
);
export default function SearchElement(props: Props) {

  const { name, symbol, industry, companyClick } = props
  const classes = useStyles();
  return (
    <div className="search-element">
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={symbol} />
          <div title={name} id={symbol} onClick={()=>companyClick(name, symbol)} >
            <IconButton color='secondary' size='small' aria-label="add to shopping cart">
              <TimelineIcon />
            </IconButton>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={industry} secondary="Industry" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <InfoIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Mission" secondary='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.'/>
        </ListItem>
      </List>
    </div>
  )
}