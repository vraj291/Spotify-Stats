import React, { useEffect, useState } from 'react'
import { FeatureChart } from '../Charts/FeatureChart'
import { ArtistsChart } from '../Charts/ArtistsChart'
import { GenresChart } from '../Charts/GenresChart'
import { MediaCard } from './MediaCard'
import { getUser } from '../../spotify/login'
import store from '../../store'
import './Home.css'

export const Home = () => {

    const [user,setUser] = useState('')

    useEffect(() => {
        getUser().then(err => {
            if(err){

            }else{
                setUser(store.getState().user.display_name)
            }
        })
    },[])

    return(
        <div className='home-wrapper'>
            <div className='home-title'>
                Hi
                <div className='home-user-name'>
                    {user}
                </div>
                !!!
            </div>
            <MediaCard/>
            <div className='main-title'>
                Here are a few interesting facts about your Spotify.
            </div>
            <div className='home-charts'>
                <FeatureChart/>
                <ArtistsChart/>
            </div>
        </div>    
    )
}