import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {getUser} from '../../spotify/login'
import default_profile from '../../assets/no_account.png'
import store from '../../store'
import { Error } from '../Error/Error';

export const UserCard = ({onClose}) => {

    const [data,setData] = useState({})
    
    useEffect(() => {
        getUser().then(err => {
            if(err){
                setData({})
            }else{
                setData(store.getState().user)
            }
        })
    },[data])

    const useStyles = makeStyles({
        close:{
            position: 'absolute',
            top: '3%',
            right: '3%'
        },

    })

    const classes = useStyles()

    return(
        <div className='user-card-wrapper'>
            <div className='user-card'> 
                <IconButton className={classes.close} onClick={onClose}>
                    <CloseIcon fontSize='large'/>
                </IconButton> 
                {Object.keys(data).length === 0? 
                    <Error height='200px' fontsize='1.1rem'/> :
                    <>
                        {data.images? <img className='user-image' src={data.images.length? data.images[0].url:default_profile}></img> : <></>}
                        <div className='user-name'>{data.display_name||'Name Not Specified'}</div>
                        <div className='user-dets'>Followers : {data.followers? data.followers.total:'Not Specified'}</div>
                        <div className='user-dets'>{data.product? "Spotify Premium":"Spotify Free"}</div>
                        <div className='user-dets'>{data.email||'Email Not Specified'}</div>
                        <div className='user-dets'>{data.country||'Country Not Specified'}</div>
                        <div className='user-profile'>
                            <a href={data.external_urls? data.external_urls.spotify:'Url Not Specified'}>View Profile</a>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
