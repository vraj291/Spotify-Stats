import store from '../store/index'
import axios from 'axios'
import {setAccess,setRefresh, setUser} from '../actions/index'

const EXPIRATION_TIME = 3600000

export const checkTokens = () => {
    let url = window.location.href
    if(url.substring(url.indexOf('?')+1,url.indexOf('=')) === 'error') return {load : false, error : true}
    let acc_token = url.substring(url.indexOf('=')+1,url.indexOf('&'))
    let ref_token = url.substring(url.lastIndexOf('=')+1,url.length)
    store.dispatch(setAccess(acc_token))
    store.dispatch(setRefresh(ref_token))
    if(acc_token.length === 0){
        return {load : true}
    }
    setInterval(refreshTokens,EXPIRATION_TIME)
    return {load : false,error : false}
}

const refreshTokens = () => {
    console.log('here')
    axios.get(process.env.REACT_APP_REFRESH_URI,{
        params:{
            refresh_token : store.getState().refresh_token
        }
    })
    .then(e => {
        store.dispatch(setAccess(e.data.access_token))
        console.log(store.getState())
    })
    .catch(err => console.log(err))
}

export const getUser = () => {
    if(Object.keys(store.getState().user).length === 0){
    return axios({
        method : 'get',
        url : `https://api.spotify.com/v1/me`,
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        }
     })
    .then(resp => {
        store.dispatch(setUser(resp.data))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }
    return new Promise((resolve) => resolve(false))
}