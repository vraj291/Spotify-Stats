import React, { useEffect, useState } from 'react'
import {constants} from '../../../constants/index'
import store from '../../../store'
import {Loader} from '../../Loader/Loader'
import {getTopTracks_month,getTopTracks_6month,getTopTracks_alltime,getRecommendedTracks, getAudioFeatures} from '../../../spotify/tracks'
import './TopTracks.css'
import { PopUp } from '../../PopUp/PopUp';
import { AddPlaylistCard} from './AddPlaylistCard'
import { Error } from '../../Error/Error'

const calcTime = (duration) => {
    let time = ''
    let min = Math.floor(duration/1000/60)
    let sec = Math.round((duration/1000/60 - Math.floor(duration/1000/60))*60)
    if(sec<10){
        time = min + ' : 0'+sec
    }else{
        time = min + ' : '+sec
    }
    return time
}

const Track1 = ({data}) => {
    return(
        <div className='tracks-top-wrapper fade-in' >
            <div>
                <img className='album-cover-top' src={data.album.images[0].url}></img>
            </div>
            <div className='tracks-top-inner'>
            <div className='tracks-top-title-wrapper'>
                <div className='tracks-top-title'>
                    <a href={data.external_urls.spotify}>{data.name}</a>
                </div> 
                {/* <div className='tracks-top-time'>
                    {calcTime(data.duration_ms)}
                </div>  */}
            </div>
            <div className='tracks-top-artist'>
                {data.artists.slice(0,data.artists.length-1).map(e => <a key={e.id} href={e.external_urls.spotify}>{e.name}, </a>)}
                <a key={data.artists[data.artists.length-1].id} href={data.artists[data.artists.length-1].external_urls.spotify}>{data.artists[data.artists.length-1].name}</a>
            </div>
            <div className='tracks-top-album'>
                <a href={data.album.external_urls.spotify}>{data.album.name+' ('+data.album.release_date.substr(0,4)+')'}</a>
            </div> 
            </div>
        </div>
    )
}

const Trackothers = ({data}) => {
    return(
        <div className='tracks-others-main'>
        {data.map((data) => 
            <div className='tracks-others-wrapper fade-in' key={data.id}>
                <div 
                    className='album-cover-others' 
                    style = {{ 
                        backgroundImage : `url("${data.album.images[0].url}")` 
                    }} 
                />
                <div className='tracks-others-inner-wrapper'>
                    <div className='tracks-others-title-wrapper'>
                        <div className='tracks-others-title'>
                            <a href={data.external_urls.spotify}>{data.name}</a>
                        </div> 
                    </div>
                    <span className='tracks-others-artist'>
                        {data.artists.slice(0,data.artists.length-1).map(e => <a key={e.id} href={e.external_urls.spotify}>{e.name}, </a>)}
                        <a key={data.artists[data.artists.length-1].id} href={data.artists[data.artists.length-1].external_urls.spotify}>{data.artists[data.artists.length-1].name}</a>
                    </span>
                    <div className='tracks-others-album'>
                        <a href={data.album.external_urls.spotify}>{data.album.name+' ('+data.album.release_date.substr(0,4)+')'}</a>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}

export const TopTracks = ({type}) => {

    const [isLoaded,setLoad] = useState(false)
    const [isError,setError] = useState(false)
    const [title,setTitle] = useState('')
    const [togglePlaylist,setTogglePlaylist] = useState(false)

    const closeNotification = () => {
        document.getElementsByClassName('popup-wrapper')[0].classList.add('come-out')
        setTimeout(() => setNotifications(prev => prev.slice(0,-1)),1500)
    }
    
    const addNotification = (err,url) => {
        setNotifications(prev => [...prev,<PopUp err={err} url={url} onclose={closeNotification}/>])
    }
    
    const [notifications,setNotifications] = useState([])

    useEffect(async () => {
        switch(type){
            case constants.SET_TRACKS1:
                setLoad(false)
                getTopTracks_month().then(err => {
                    if(err){
                        setError(true)
                    }else{
                        setTitle('TOP TRACKS THIS MONTH')
                        setError(false)
                        setLoad(true)
                    }
                })
                break;
            case constants.SET_TRACKS2:
                setLoad(false)
                getTopTracks_6month().then(err => {
                    if(err){
                        setError(true)
                    }else{
                        setTitle('TOP TRACKS IN THE LAST 6 MONTHS')
                        setError(false)
                        setLoad(true)
                    }
                });
                break;
            case constants.SET_TRACKS3:
                setLoad(false)
                getTopTracks_alltime().then(err => {
                    if(err){
                        setError(true)
                    }else{
                        setTitle('TOP TRACKS OF ALL TIME')
                        setError(false)
                        setLoad(true)
                    }
                });
                break;
            case constants.SET_RECOMMEND1:
                setLoad(false)
                getRecommendedTracks().then(err => {
                    if(err){
                        setError(true)
                    }else{
                        setTitle('RECOMMENDATIONS')
                        setError(false)
                        setLoad(true)
                    }
                })
                break;
        }
    },[type])

    const selectData = (flag) => {
        let data = []
        if(title === 'TOP TRACKS THIS MONTH')
            data = store.getState().top_tracks_month
        else if(title === 'TOP TRACKS IN THE LAST 6 MONTHS')
            data = store.getState().top_tracks_6month
        else if(title === 'TOP TRACKS OF ALL TIME')
            data = store.getState().top_tracks_alltime
        else if(title === 'RECOMMENDATIONS')
            data = store.getState().recommended_tracks
        if(flag === 0){
            return data[0]
        }else if(flag === 1){
            return data.slice(1)
        }else{
            return data
        }
    }

    const handleTogglePlaylist = () => {
        if(togglePlaylist === false){
            document.getElementsByClassName('create-playlist-input')[0].style.display = 'flex'
            window.scrollTo(0,0)
            document.body.style.overflow = 'hidden'
            setTogglePlaylist(true)
        }else{
            document.getElementsByClassName('create-playlist-input')[0].style.display = 'none'
            document.body.style.overflow = 'scroll'
            setTogglePlaylist(false)
        }
    }

    return(
        <>
        {isError ? 
            <Error height='300px' fontsize='1.3rem'/> : 
            isLoaded ? 
            <>
                {notifications}
                <div className='main-title'>{title}</div>
                <div className='tracks-wrapper'>
                    <Track1 data={selectData(0)}/>
                    <Trackothers data={selectData(1)}/>
                </div>
                <div className='create-playlist-wrapper'>
                    <button className='login-button' onClick={handleTogglePlaylist}>Create Playlist</button>
                </div>
                <AddPlaylistCard 
                    data={selectData(2)} 
                    notify={addNotification}
                    handleTogglePlaylist={handleTogglePlaylist}
                />
            </> :
            <Loader/> 
        }
        </>
    )
}