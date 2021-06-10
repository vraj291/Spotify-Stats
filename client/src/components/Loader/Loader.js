import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import './Loader.css'

export const Loader = () => {

    const useStyles = makeStyles({
        root: {
            fontFamily : "'Titillium Web', sans-serif",
            color : 'rgb(30,215,96)'
        }
    });
    
    const classes = useStyles();

    return(
        <div className='loading-wrapper'>
            <div className = 'loading'>
                <div className='bar'/>
                <div className='bar'/>
                <div className='bar'/>
                <div className='bar'/>
                <div className='bar'/>
                <div className='bar'/>
                <div className='bar'/>
                <div className='bar'/>
            </div>
            <Typography className={classes.root}>FETCHING YOUR DATA</Typography>
        </div>
)}