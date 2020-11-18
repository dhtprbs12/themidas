import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import warrenBuffett from '../images/warren-buffett.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MostPopular2: React.FC = () => {
  const classes = useStyles();
  return (
    <div className='mostPopular'>
      <div className='mostPopular-container'>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={warrenBuffett}
              title="Warren Buffett"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Warren Buffett
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Be fearful when others are greedy, and greedy when others are fearful.
          </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
        </Button>
            <Button size="small" color="primary">
              Learn More
        </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  )
}

export default MostPopular2