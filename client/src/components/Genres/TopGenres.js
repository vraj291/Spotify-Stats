import React, { useState,useEffect } from 'react'
import {constants} from '../../constants/index'
import store from '../../store'
import {Loader} from '../Loader/Loader'
import { Error } from '../Error/Error'
import {getGenresCount_month,getGenresCount_6month,getGenresCount_alltime} from '../../spotify/artists'
import { GenresChart } from '../Charts/GenresChart'
import { conFollowers } from '../Artists/TopArtists/TopArtists'

const GenreCard = ({data}) => {

    // useEffect(() => {
    //     document.getElementsByClassName(`genre-artist-wrapper ${data.name.replaceAll(' ','_')}`)[0].addEventListener('scroll',(e) => {
    //         console.log(e)
    //     })
    //     document.getElementsByClassName(`genre-artist ${data.name.replaceAll(' ','_')}`)[0].classList.add('active-card')
    // },[])

    return(
        <div className='genre-card'>
            <div className='genre-title '>{data.name}</div>
            <div className={`genre-artist-wrapper ${data.name.replaceAll(' ','_')}`}>
                {data.artists.map(ar => (
                    <div 
                        className= {`genre-artist ${data.name.replaceAll(' ','_')} active-card`} 
                        style={{backgroundImage: `url("${ar.image}")`}}
                        onClick={() => window.location.href = ar.url}
                    >
                        <div className='genre-artist-info'>
                            <div>{ar.name}</div>
                            <div>{conFollowers(ar.followers)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const TopGenres = ({type}) => {

    const [isLoaded,setLoad] = useState(false)
    const [isError,setError] = useState(false)
    const [data,setData] = useState({})

    useEffect(async () => {
        switch(type){
            case constants.SET_GENRES1:
                setLoad(false)
                getGenresCount_month().then(err => {
                    if(err){
                        setError(true)
                        setData({})
                    }else{
                        setData(store.getState().top_genres_month)
                        setError(false)
                        setLoad(true)
                    }
                })
                break;
            case constants.SET_GENRES2:
                setLoad(false)
                getGenresCount_6month().then(err => {
                    if(err){
                        setError(true)
                    }else{
                        setData(store.getState().top_genres_6month)
                        setError(false)
                        setLoad(true)
                    }
                });
                break;
            case constants.SET_GENRES3:
                setLoad(false)
                getGenresCount_alltime().then(err => {
                    if(err){
                        setError(true)
                    }else{
                        setData(store.getState().top_genres_alltime)
                        setError(false)
                        setLoad(true)
                    }
                });
                break;
        }
    },[type])

    const getCount = () => {
        if(isError === true || isLoaded === false) return []
        let out=[]
        for(let item of Object.keys(data)){
            out.push({
                x : item,
                y : data[item].length
            })
        }
        console.log(out)
        return out
    }

    const getTopArtistbyGenre = () => {
        let inp = getCount().sort((a,b) => b.y - a.y).slice(0,8)
        console.log(inp)
        let out = []
        for(let item of inp){
            out.push({
                name : item.x,
                artists : data[item.x]
            })
        }
        console.log(out)
        return out
    }

    return(
        <>
        {isError ? 
            <Error height='300px' fontsize='1.3rem'/> : 
            isLoaded ? 
            <div className='genres-wrapper'>
                <GenresChart 
                    type={type === constants.SET_GENRES1?'Top Genres during the past month':type === constants.SET_GENRES2?'Top Genres during the last 6 months':'Top Genres of All Time'}
                    data={getCount()}
                />
                <div className='main-title'>Top Artists By Genre</div>
                <div className='genres-list'>
                    {getTopArtistbyGenre().map(e => <GenreCard data={e} key={e.name}/>)}
                </div> 
            </div>
            : <Loader/> 
        }
        </>    
    )
}