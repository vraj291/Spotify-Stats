import store from '../store/index'
import axios from 'axios'
import {setUserPlaylists,setFeaturedPlaylists} from '../actions/index'

export const AddtoPlaylist = (meta,data) => {
    return createPlaylist(meta).then(({id,url}) => {
        if(id === null && url === null) return new Promise((resolve) => resolve({
            error: true,
            url: null
        }))
        return axios({
            method : 'post',
            url : `https://api.spotify.com/v1/playlists/${id}/tracks`,
            headers : {
                'Accept':'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${store.getState().access_token}`
            },
            params : {
               uris : data.reduce((ac,e) => ac+e.uri+',','').slice(0,-1)
            }
        })
        .then(resp => {
            return {
                error: false,
                url
            }
        })
        .catch(err => {
            console.log(err)
            return {
                error: true,
                url
            }
        })
    })
}

const createPlaylist = ({name,desc,collab}) => {
    return axios({
            method : 'post',
            url : `https://api.spotify.com/v1/users/${store.getState().user.id}/playlists`,
            headers : {
                'Accept':'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${store.getState().access_token}`
            },
            data : {
                "name": name,
                "description": desc,
                "public": collab
            }
        })
        .then(resp => {
            console.log(resp.data)
            return {
                id : resp.data.id,
                url : resp.data.external_urls.spotify
            }
        })
        .catch(err => {
            console.log(err)
            return {
                id : null,
                url : null
            }
        })
}

export const getUserPlaylists = () => {
    if(store.getState().user_playlists.length === 0){
    return axios({
        method : 'get',
        url : `	https://api.spotify.com/v1/me/playlists`,
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            "limit": '50'
        }
    })
    .then(resp => {
        console.log(resp.data)
        store.dispatch(setUserPlaylists(resp.data.items))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }
    return new Promise((resolve) => resolve(false))
}

export const getFeaturedPlaylists = () => {
    if(store.getState().featured_playlists.length === 0){
    return axios({
        method : 'get',
        url : `	https://api.spotify.com/v1/browse/featured-playlists`,
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            "limit": '50'
        }
    })
    .then(resp => {
        console.log(resp.data)
        store.dispatch(setFeaturedPlaylists(resp.data.playlists.items))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }
    return new Promise((resolve) => resolve(false))
}

export const getPlaylistTracks = (id) => {
    return axios({
        method : 'get',
        url : `https://api.spotify.com/v1/playlists/${id}/tracks`,
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            "limit": '50'
        }
    })
    .then(resp => {
        console.log(resp.data.items)
        return resp.data.items
    })
    .catch(err => console.log(err))
}