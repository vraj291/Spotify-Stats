import React, { useState } from 'react';
import {Login} from './components/Login/Login'
import './App.css';
import {checkTokens} from './spotify/login'
import {Tracks} from './components/Tracks/Tracks'
import {Artists} from './components/Artists/Artists'
import {Recommend} from './components/Recommendations/Recommend'
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Playlists } from './components/Playlists/Playlists';
import {Error} from './components/Error/Error'
import {Footer} from './components/Footer/Footer'
import { Genres } from './components/Genres/Genres';
import store from './store';
import {logOut} from './actions/index'
import { ThankYou } from './components/ThankYou/ThankYou';

export const App = () => {

  const [active,setActive] = useState(<Home/>)

  const setWindow = (choice) => {
    switch(choice){
      case 0 : 
        setActive(<Home/>)
        break;
      case 1 : 
        setActive(<Tracks/>)
        break;
      case 2 : 
        setActive(<Artists/>)
        break;
      case 3 : 
        setActive(<Genres/>)
        break;
      case 4 : 
        setActive(<Recommend/>)
        break;
      case 5 : 
        setActive(<Playlists/>)
        break;
      case 6:
        setActive(<ThankYou/>)
        setTimeout(() => {
          store.dispatch(logOut())
          let url = window.location.href
          window.location.href = url.substr(0,url.lastIndexOf('/'))
        },2000)
        break;
      case 7:
        setActive(<Error/>)
        break;
      default: 
        setActive(<></>)
        break;
    }
  }

  return(
    <div className='app'>
    {checkTokens().load?
      <>
        <Login/> 
      </> : 
      checkTokens().error?
      <>
        <Error height='300px' fontsize='1.3rem'/>
      </> :
      <div className='main-app'>
        <Navbar 
          setWindow = {setWindow}
        />
        {active}
        <Footer/>
      </div> 
    }
    </div>
  )
}
