import React, { useEffect, useState } from 'react'
import { getUserPlaylists, getFeaturedPlaylists} from '../../spotify/playlists'
import store from '../../store'
import { constants } from '../../constants'
import Typography from '@material-ui/core/Typography';
import {Loader} from '../Loader/Loader'
import { Error } from '../Error/Error'
import './Playlists.css'

const PlaylistCard = ({data}) => {
    return(
        <div className='playlist-card' style={{backgroundImage : `url("${data.images[0].url}")` }}>
            <div className='playlist-card-content'>
                <Typography component="h5" variant="h5">
                    {data.name}
                </Typography>
                <Typography component="subtitle1" variant="subtitle1">
                    {data.owner.display_name}
                </Typography>
            </div>
            <div className='playlist-desc'>
                {data.description === ''?'No Description':data.description}
                <button className='playlist-listen'>
                    <a href={data.external_urls.spotify}>Listen</a>
                </button>
            </div>
        </div>
    )
}

export const TopPlaylists = ({type}) => {

    const [data,setData] = useState([])
    const [isLoaded,setLoad] = useState(false)
    const [isError,setError] = useState(false)

    useEffect(async () => {
        switch(type){
            case constants.SET_USERPLAYLISTS:
                setLoad(false)
                getUserPlaylists().then(err => {
                    if(err){
                        setError(true)
                    }else{
                        setData(store.getState().user_playlists)
                        setLoad(true)
                        setError(false)
                    }
                })
                break;
            case constants.SET_FEATUREDPLAYLISTS:
                setLoad(false)
                getFeaturedPlaylists().then(err => {
                    if(err){
                        setError(true)
                    }else{
                        setData(store.getState().featured_playlists)
                        setLoad(true)
                        setError(false)
                    }
                })
                break;
        }
    },[type])

    return(
        <>
            {/* <div className='main-title'>Top User Playlists</div> */}
            {isError?
            <Error height='300px' fontsize='1.3rem'/> : 
            isLoaded? 
            <>
                <div className='playlist-wrapper'>
                    {data.map(e => <PlaylistCard data={e} key={e.id}/>)}
                </div> 
            </> :
            <Loader/> }
        </>
    )
}