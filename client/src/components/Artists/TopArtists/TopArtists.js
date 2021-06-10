import React, { useEffect, useState } from 'react'
import {constants} from '../../../constants/index'
import store from '../../../store'
import {Loader} from '../../Loader/Loader'
import {getTopArtists_month,getTopArtists_6month,getTopArtists_alltime, getRecommendedArtists} from '../../../spotify/artists'
import './TopArtists.css'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Error } from '../../Error/Error'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '20rem',
    borderRadius : '10px',
    transform : 'scale(0.9,0.9)',
    margin: '0.5rem',
    backgroundColor : ' rgb(30,215,96)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', 
  },
  releases:{
    fontFamily: "'Titillium Web', sans-serif",
    fontWeight: '500',
    fontSize: '1.3rem'
  },
  genre:{
      height: '3rem',
      fontFamily: "'Titillium Web', sans-serif",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));


export const conFollowers = (followers) => {
    if(followers >= 1000000){
        return `${(followers/100000).toFixed(1)} Million`
    }else if(followers >= 1000){
      return `${Math.round(followers/1000)}K`
    }else{
        return `${followers}`
    }
}

export default function ArtistCard({data}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={data.name}
        style={{
          fontFamily: "'Titillium Web', sans-serif",
        }}
        subheader={conFollowers(data.followers.total)}
      />
      <CardMedia
        className={classes.media}
        image={data.images[0].url}
        href={data.external_urls.spotify}
      />
      <CardContent className={classes.genre}> 
        {data.genres.slice(0,3).reduce((ac,e) => ac+e+', ',' ').slice(0,-2)}
      </CardContent>
      <CardActions disableSpacing>
        <Typography className={classes.releases}>Popular Releases</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            {data.top.map(e => <div style={{fontSize : '1rem'}}><a href={e.album.external_urls.spotify}>{e.name+' ('+e.album.release_date.substr(0,4)+')'}</a></div>)}
        </CardContent>
      </Collapse>
    </Card>
  );
}

const Artist_top = ({data}) => {
    return(
        <div className='artists-top-wrapper' style={{
          backgroundImage : `url("${data.images[0].url}")`
        }}>
            <div className='artists-top-image'>
                <img class='artist-album-cover-top' src={data.images[0].url}></img>
            </div>
            <div className='artists-top-inner-wrapper'>
                <div className='artists-top-inner-inner-wrapper'>
                  <div className='artists-top-title-wrapper'>
                    <div className='artists-top-title'>
                        <a href={data.external_urls.spotify}>{data.name}</a>
                    </div> 
                    <div className='artists-top-followers'>
                        {conFollowers(data.followers.total)}
                    </div>
                </div>
                <div className='artists-top-genres'>
                    {data.genres.slice(0,3).reduce((ac,e) => ac+e+', ',' ').slice(0,-2)}
                </div>
                <div>
                    <div className='artists-top-releases-title'>
                        Popular Releases
                    </div>
                    <div className='artists-top-releases'>
                        {data.top.map(e => <div><a href={e.album.external_urls.spotify}>{e.name+' ('+e.album.release_date.substr(0,4)+')'}</a></div>)}
                    </div>
                </div>
              </div>
            </div>
        </div>
    )
}

const Artist_others = ({data}) => {
    return(
        <div className='artists-others-wrapper'>
        {data.map((data) => 
            <ArtistCard data={data}/>
        )}
        </div>
    )
}

export const TopArtists = ({type}) => {

    const [isLoaded,setLoad] = useState(false)
    const [isError,setError] = useState(false)
    const [title,setTitle] = useState('')

    useEffect(() => {
        switch(type){
            case constants.SET_ARTISTS1:
                setLoad(false)
                getTopArtists_month().then(err => {
                  if(err){
                    setError(true)
                  }else{
                    setTitle('TOP ARTISTS THIS MONTH')
                    setLoad(true)
                    setError(false)
                  }
                })
                break;
            case constants.SET_ARTISTS2:
                setLoad(false)
                getTopArtists_6month().then(err => {
                  if(err){
                    setError(true)
                  }else{
                    setTitle('TOP ARTISTS IN THE LAST 6 MONTHS')
                    setLoad(true)
                    setError(false)
                  }
                })
                break;
            case constants.SET_ARTISTS3:
                setLoad(false)
                getTopArtists_alltime().then(err => {
                  if(err){
                    setError(true)
                  }else{
                    setTitle('TOP ARTISTS OF ALL TIME')
                    setLoad(true)
                    setError(false)
                  }
                });
                break;
            case constants.SET_RECOMMEND2:
                setLoad(false)
                getRecommendedArtists().then(err => {
                  if(err){
                    setError(true)
                  }else{
                    setTitle('RECOMMENDED ARTISTS')
                    setLoad(true)
                    setError(false)
                  }
                });
                break;
        }
    },[type])

    const selectData = (flag) => {
        let data = []
        if(title === 'TOP ARTISTS THIS MONTH')
            data = store.getState().top_artists_month
        else if(title === 'TOP ARTISTS IN THE LAST 6 MONTHS')
            data = store.getState().top_artists_6month
        else if(title === 'TOP ARTISTS OF ALL TIME')
            data = store.getState().top_artists_alltime
        else if(title === 'RECOMMENDED ARTISTS')
            data = store.getState().recommended_artists
        if(flag === 0){
          return data[0]
        }
        return data.slice(1)
    }

    return(
        <>
        {isError?
          <Error height='300px' fontsize='1.3rem'/> : 
          isLoaded ? 
            <>
            <div style={{height:'1rem'}}></div>
            <div className='main-title'>{title}</div>
            <div className='artists-wrapper'>
                <Artist_top data={selectData(0)}/>
                <Artist_others data={selectData(1)}/>
            </div>
            </> :
            <Loader/> 
        }
        </>
    )
}