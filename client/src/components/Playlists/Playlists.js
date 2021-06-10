import React, { useEffect, useState } from 'react'
import { constants } from '../../constants'
import { TopPlaylists } from './TopPlaylists'

export const Playlists = () => {

    const [type,setType] = useState(constants.SET_USERPLAYLISTS)

    useEffect(() => {
        let items = document.getElementsByClassName('subnav-item')
        console.log(items)
        if(items.length === 0) return
        for(let i of items){
            i.classList.remove('subnav-active')
        }
        if(type === constants.SET_USERPLAYLISTS){
            items[0].classList.add('subnav-active')
        }else{ 
            items[1].classList.add('subnav-active')
        }
    },[type])

    return(
        <>
            <div className='subnav-main'>
                <div className='subnav-wrapper'>
                    <div className='subnav-item subnav-active' onClick={() => setType(constants.SET_USERPLAYLISTS)}>User</div>
                    <div className='subnav-item' onClick={() => setType(constants.SET_FEATUREDPLAYLISTS)}>Featured</div>
                </div>
            </div>
            <TopPlaylists type={type}/>
        </>
    )
}