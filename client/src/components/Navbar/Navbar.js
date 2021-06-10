import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {UserCard} from './UserCard'
import './Navbar.css'

const types = ['4 Weeks','6 Months','All Time']


export const Navbar = (props) => {

    const [active,setActive] = useState(0)
    const [toggleIcon,setToggleIcon] = useState(<MenuIcon fontSize='large'/>)
    const [toggleState,setToggleState] = useState(false)
    const [toggleUser,setToggleUser] = useState(false)

    const handleToggleMenu = () => {
        if(toggleState === false){
            document.getElementsByClassName('nav-link-wrapper')[0].style.display = 'flex'
            document.getElementsByClassName('nav-link-wrapper')[0].classList.remove('close-mobile-nav')
            document.getElementsByClassName('nav-link-wrapper')[0].classList.add('open-mobile-nav')
            document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('fade-in'))
            setToggleIcon(<CloseIcon fontSize='large'/>)
            setToggleState(true)
            document.body.style.overflow = 'hidden'
        }else{
            //document.getElementsByClassName('nav-link-wrapper')[0].style.display = 'none'
            document.getElementsByClassName('nav-link-wrapper')[0].classList.remove('open-mobile-nav')
            document.getElementsByClassName('nav-link-wrapper')[0].classList.add('close-mobile-nav')
            document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('fade-in'))
            setToggleIcon(<MenuIcon fontSize='large'/>)
            setToggleState(false)
            document.body.style.overflow = 'scroll'
        }
    }

    const handleToggleUser = () => {
        if(toggleUser === false){
            document.getElementsByClassName('user-card-wrapper')[0].style.display = 'block'
            setToggleUser(true)
        }else{
            document.getElementsByClassName('user-card-wrapper')[0].style.display = 'none'
            setToggleUser(false)
        }
    }

    window.addEventListener('resize',() => {
        if(window.innerWidth > 1100 ){
            document.getElementsByClassName('nav-link-wrapper')[0].classList.remove('close-mobile-nav')
            document.getElementsByClassName('nav-link-wrapper')[0].classList.add('open-mobile-nav')
            document.querySelectorAll('.nav-link').forEach(link => link.classList.add('fade-in'))
            setToggleState(true)
            document.body.style.overflow = 'hidden'

        }else if(toggleState === true){
            setToggleState(false)
            setToggleIcon(<MenuIcon fontSize='large'/>)
            document.body.style.overflow = 'scroll'
            document.getElementsByClassName('nav-link-wrapper')[0].classList.remove('open-mobile-nav')
            document.getElementsByClassName('nav-link-wrapper')[0].classList.add('close-mobile-nav')
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('fade-in'))
        }
    })

    const useStyles = makeStyles({
        butt:{
            display : 'none',
            height: 'min-content',
            alignSelf: 'center',
            ['@media (max-width:1100px)']: { 
                display:'block',
                zIndex : '6'
            }
        },
        acc:{
            margin : '0 0.5rem',
            height: 'min-content',
            alignSelf: 'center'
        }
    })

    const classes = useStyles()

    const changeWindow = (choice) => {
        if(active === choice) return
        if(choice != 6){
            document.getElementsByClassName('nav-link')[active].classList.remove('active')
            setActive(choice)
            document.getElementsByClassName('nav-link')[choice].classList.add('active')
        }
        props.setWindow(choice)
        if(window.innerWidth < 1100 ){
            setTimeout(handleToggleMenu,800)
        }
    }

    return(   
        <nav className='nav-wrapper'>
            <h1 className='nav-header'>
                Spotify Stats
            </h1>
            <div className='nav'>
            <ul className='nav-link-wrapper'>
                <li onClick={() => changeWindow(0)}>
                    <div className='nav-link active'>Home</div>
                </li>
                <li onClick={() => changeWindow(1)}>
                    <div className='nav-link' >Top Tracks</div>
                </li>
                <li onClick={() => changeWindow(2)}>
                    <div className='nav-link' >Top Artists</div>
                </li>
                <li onClick={() => changeWindow(3)}>
                    <div className='nav-link' >Top Genres</div>
                </li>
                <li onClick={() => changeWindow(4)}>
                    <div className='nav-link' >Recommendations</div>
                </li>
                <li onClick={() => changeWindow(5)}>
                    <div className='nav-link' >Playlists</div>
                </li>
                <li onClick={() => changeWindow(6)}>
                    <div className='log-out'>Log Out</div>
                </li>
            </ul>
            <IconButton className={classes.acc} onClick={handleToggleUser}>
                <AccountCircle fontSize='large'/>
            </IconButton>
            <IconButton className={classes.butt} onClick={handleToggleMenu}>
                {toggleIcon}
            </IconButton>
            <UserCard onClose={handleToggleUser}/>
           </div> 
        </nav>
)}