import React, { useEffect, useState } from 'react'
import { constants } from '../../constants'
import './Genres.css'
import { TopGenres } from './TopGenres'

export const Genres = () => {

    const [type,setType] = useState(constants.SET_GENRES1)

    useEffect(() => {
        let items = document.getElementsByClassName('subnav-item')
        if(items.length === 0) return
        for(let i of items){
            i.classList.remove('subnav-active')
        }
        if(type === constants.SET_GENRES1){
            items[0].classList.add('subnav-active')
        }else if(type === constants.SET_GENRES2){
            items[1].classList.add('subnav-active')
        }else{
            items[2].classList.add('subnav-active')
        }
    },[type])

    return(
        <>
            <div className='subnav-main'>
                <div className='subnav-wrapper'>
                    <div className='subnav-item subnav-active' onClick={() => setType(constants.SET_GENRES1)}>4 Weeks</div>
                    <div className='subnav-item' onClick={() => setType(constants.SET_GENRES2)}>6 Months</div>
                    <div className='subnav-item' onClick={() => setType(constants.SET_GENRES3)}>All Time</div>
                </div>
            </div>
            <TopGenres type={type}/>
        </>
    )
}