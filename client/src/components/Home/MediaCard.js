import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import { getCurrentlyPLaying } from '../../spotify/tracks';
import no_albumcover from '../../assets/no_albumcover.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns : '1.3fr 1fr',
    width: '25rem'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%'
  },
  controls: {
    display: 'flex',
    justifyContent : 'space-evenly',
    alignItems: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  device:{
      marginTop : '1.5rem'
  }
}));

export const MediaCard = () => {

    const classes = useStyles();
    const theme = useTheme();

    const [data,setData] = useState({
        device : {
            name : 'Not Available'
        },
        shuffle_state : false,
        repeat_state : 'off',
        item : {
            name : 'Not Avaliable',
            artists : [],
            album : {}
        }
    })

    const getCurrData = () => {
        getCurrentlyPLaying().then(curr => {
            if(Object.keys(curr).length === 0){
              setData(prev =>  Object.assign({},prev))
            }
            else if(curr.currently_playing_type === 'ad'){
                setData({
                    device : {
                        name : data.device.name
                    },
                    shuffle_state : data.shuffle_state,
                    repeat_state : data.repeat_state,
                    item : {
                        name : 'Ad',
                        artists : [],
                        album : {}
                    }
                })
            }else{
                setData(curr)
            }
        })
    }

    useEffect(() => {
      getCurrData()
    },[])

    useEffect(() => {
        let timeStamp = setTimeout(getCurrData,30000)
        return () => clearTimeout(timeStamp)
    },[data])

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {data.item.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.item.artists.reduce((ac,e) => ac+e.name+', ','').slice(0,-2)}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" className={classes.device}>
            {data.device.name}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {/* <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
          <IconButton aria-label="repeat" style={{backgroundColor : data.repeat_state === 'off'? 'transparent' : 'rgb(30,215,96)'}}>
            <RepeatIcon/>
          </IconButton>
          <IconButton aria-label="shuffle" style={{backgroundColor : data.shuffle_state === 'off'? 'transparent' : 'rgb(30,215,96)'}}>
            <ShuffleIcon/>
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={data.item.album.images? data.item.album.images[0].url : no_albumcover}
        title="Album Cover"
      />
    </Card>
  );
}