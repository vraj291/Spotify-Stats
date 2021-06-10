import store from '../store/index'
import axios from 'axios'
import {setArtists1,setArtists2,setArtists3,setGenres1,setGenres2,setGenres3,setRecommendArtists} from '../actions/index'

export const getTopArtists_month = async () => {
    if(store.getState().top_artists_month.length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/artists',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            time_range : 'short_term',
            limit : '15'
        }
     })
     .then(async (resp) => {
        let data = resp.data.items
        let promises = []
        for (let i in data){
            promises.push(getTracksforArtist(data[i].id).then(e => {
                data[i].top = e
                return data[i]
            }))
        }
        return Promise.all(promises)
    })
    .then(data => {
        store.dispatch(setArtists1(data))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }else{
        return new Promise((resolve) => resolve(false))
    }
}

export const getTopArtists_6month = async () => {
    if(store.getState().top_artists_6month.length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/artists',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            time_range : 'medium_term',
            limit : '15'
        }
     })
     .then(async (resp) => {
        let data = resp.data.items
        let promises = []
        for (let i in data){
            promises.push(getTracksforArtist(data[i].id).then(e => {
                data[i].top = e
                return data[i]
            }))
        }
        return Promise.all(promises)
    })
    .then(data => {
        store.dispatch(setArtists2(data))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }else{
        return new Promise((resolve) => resolve(false))
    }
}

export const getTopArtists_alltime = async () => {
    if(store.getState().top_artists_alltime.length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/artists',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            time_range : 'long_term',
            limit : '15'
        }
     })
     .then(async (resp) => {
        let data = resp.data.items
        let promises = []
        for (let i in data){
            promises.push(getTracksforArtist(data[i].id).then(e => {
                data[i].top = e
                return data[i]
            }))
        }
        return Promise.all(promises)
    })
    .then(data => {
        store.dispatch(setArtists3(data))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }else{
        return new Promise((resolve) => resolve(false))
    }
}

export const getRecommendedArtists = async () => {
    if(store.getState().recommended_artists.length === 0){
    return getTopArtists_month().then(async (err) => {
        if(err) throw 'Data not Available'
        let data = store.getState().top_artists_month.slice(0,5)
        let promises = []
        for (let i in data){
            promises.push(getRelatedArtists(data[i].id).then(e => e))
        }
        return Promise.all(promises)
    })
    .then(async (old_data) => {
        console.log(old_data)
        let data = []
        for(let i of old_data){
            for(let j of i){
                data.push(j)
            }
        }
        let promises = []
        for (let i in data){
            promises.push(getTracksforArtist(data[i].id).then(e => {
                data[i].top = e
                return data[i]
            }))
        }
        return Promise.all(promises)
    })
    .then(data => {
        console.log(data)
        store.dispatch(setRecommendArtists(data))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }else{
        return new Promise((resolve) => resolve(false))
    }
}

const getTracksforArtist = (id) => {
    return axios({
        method : 'get',
        url : `https://api.spotify.com/v1/artists/${id}/top-tracks`,
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            market : 'ES'
        }
     })
    .then(resp => resp.data.tracks.slice(0,5))
    .catch(err => {
        console.log(err)
        return []
    })
}

const getRelatedArtists = (id) => {
    return axios({
        method : 'get',
        url : `https://api.spotify.com/v1/artists/${id}/related-artists`,
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${store.getState().access_token}`
        }
     })
    .then(resp => resp.data.artists.slice(0,3))
    .catch(err => {
        console.log(err)
        return []
    })
}

export const getGenresCount_month = async () => {
    if(Object.keys(store.getState().top_genres_month).length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/artists',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            time_range : 'short_term',
            limit : '50'
        }
    })
    .then(resp => {
        let out = {}
        for(let item of resp.data.items){
            for(let genre of item.genres){
                if(out[genre] === undefined){
                    out[genre] = [{name : item.name,followers : item.followers.total,image : item.images[0].url,url : item.external_urls.spotify}]
                }else{
                    out[genre].push({name : item.name,followers : item.followers.total,image : item.images[0].url,url : item.external_urls.spotify})
                }
            }
        }
        for(let item of Object.keys(out)){
            out[item].sort((a,b) =>  b.followers - a.followers)
        }
        store.dispatch(setGenres1(out))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }
    return new Promise((resolve) => resolve(false))
}

export const getGenresCount_6month = async () => {
    if(Object.keys(store.getState().top_genres_6month).length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/artists',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            time_range : 'medium_term',
            limit : '50'
        }
    })
    .then(resp => {
        let out = {}
        for(let item of resp.data.items){
            for(let genre of item.genres){
                if(out[genre] === undefined){
                    out[genre] =  [{name : item.name,followers : item.followers.total,image : item.images[0].url,url : item.external_urls.spotify}]
                }else{
                    out[genre].push({name : item.name,followers : item.followers.total,image : item.images[0].url,url : item.external_urls.spotify})
                }
            }
        }
        for(let item of Object.keys(out)){
            out[item].sort((a,b) =>  b.followers - a.followers)
        }
        store.dispatch(setGenres2(out))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }
    return new Promise((resolve) => resolve(false))
}

export const getGenresCount_alltime= async () => {
    if(Object.keys(store.getState().top_genres_alltime).length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/artists',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            time_range : 'long_term',
            limit : '50'
        }
    })
    .then(resp => {
        let out = {}
        for(let item of resp.data.items){
            for(let genre of item.genres){
                if(out[genre] === undefined){
                    out[genre]  = [{name : item.name,followers : item.followers.total,image : item.images[0].url,url : item.external_urls.spotify}]
                }else{
                    out[genre].push({name : item.name,followers : item.followers.total,image : item.images[0].url,url : item.external_urls.spotify})
                }
            }
        }
        for(let item of Object.keys(out)){
            out[item].sort((a,b) =>  b.followers - a.followers)
        }
        store.dispatch(setGenres3(out))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }
    return new Promise((resolve) => resolve(false))
}