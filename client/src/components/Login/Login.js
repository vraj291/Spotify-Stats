import React, { useEffect } from 'react';
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/spotify_logo.png'
import './Login.css'

export const Login = () => {

    const useStyles = makeStyles({
        butt : {
            backgroundColor : 'rgb(30,215,96)',
            fontSize : '1.4rem',
            fontWeight : 'bolder',
            padding: '0.7rem',
            minWidth: '9rem',
            marginBottom : '2rem',
            borderRadius : '400px',
            fontFamily : "'Saira Condensed', sans-serif",
            '&:hover' : {   
                backgroundColor : 'rgb(255,255,255)',
                color:'rgb(30,215,96)',
                transform : 'scale(0.96,0.96)'
            }
        }
    });

    const classes = useStyles();

    return(
        <div className='login-wrapper'>
            <div className='login'>
                <img src={logo} width="200" alt="Logo" />
                <div className='login-title'>Spotify Stats</div>
            </div>
            <div className='login-subtitle'>Discover your listening habits</div>
            <Button className={classes.butt} href={process.env.REACT_APP_LOGIN_URI}>
                Login
            </Button>
        </div>
    )
}