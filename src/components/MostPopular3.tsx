import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import issacNewton from '../images/issac-newton.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MostPopular3: React.FC = () => {
  const classes = useStyles();
  return (
    <div className='mostPopular'>
      <div className='mostPopular-container'>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={issacNewton}
              title="Issac Newton"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Issac Newton
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Could calculate the motions of the heavenly bodies, but not the madness of the people
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

export default MostPopular3