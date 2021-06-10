import React, { useEffect, useState } from 'react'
import { constants } from '../../constants'
import { TopTracks } from '../Tracks/TopTracks/TopTracks'
import { TopArtists } from '../Artists/TopArtists/TopArtists'

export const Recommend = () => {

    const [type,setType] = useState(constants.SET_RECOMMEND1)

    useEffect(() => {
        let items = document.getElementsByClassName('subnav-item')
        console.log(items)
        if(items.length === 0) return
        for(let i of items){
            i.classList.remove('subnav-active')
        }
        if(type === constants.SET_RECOMMEND1){
            items[0].classList.add('subnav-active')
        }else{ 
            items[1].classList.add('subnav-active')
        }
    },[type])

    return(
        <>
            <div className='subnav-main'>
                <div className='subnav-wrapper'>
                    <div className='subnav-item subnav-active' onClick={() => setType(constants.SET_RECOMMEND1)}>Tracks</div>
                    <div className='subnav-item' onClick={() => setType(constants.SET_RECOMMEND2)}>Artists</div>
                </div>
            </div>
            {type === constants.SET_RECOMMEND1 ? <TopTracks type={type}/> : <TopArtists type={type}/>}
        </>
    )
}