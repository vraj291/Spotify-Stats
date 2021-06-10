import store from '../store/index'
import axios from 'axios'
import {setRecommendTracks, setTracks1,setTracks2,setTracks3,setAudioFeatures,setArtistsCount} from '../actions/index'
import {getTopArtists_month} from './artists'

export const getTopTracks_month = async () => {
    if(store.getState().top_tracks_month.length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/tracks',
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
    .then(resp => {
        store.dispatch(setTracks1(resp.data.items))
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

export const getTopTracks_6month = async () => {
    if(store.getState().top_tracks_6month.length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/tracks',
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
    .then(resp => {
        store.dispatch(setTracks2(resp.data.items))
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

export const getTopTracks_alltime = async () => {
    if(store.getState().top_tracks_alltime.length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/tracks',
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
    .then(resp => {
        store.dispatch(setTracks3(resp.data.items))
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


export const getRecommendedTracks = async () => {
    if(store.getState().recommended_tracks.length === 0){
        if(store.getState().top_tracks_month.length === 0){
            let err = await getTopTracks_month()
            if(err) return new Promise((resolve) => resolve(true))
        }
        if(store.getState().top_artists_month.length === 0){
            let err = await getTopArtists_month()
            if(err) return new Promise((resolve) => resolve(true))
        }
        return axios({
            method : 'get',
            url : 'https://api.spotify.com/v1/recommendations',
            headers : {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${store.getState().access_token}`
            },
            params : {
                market : 'ES',
                limit : '15',
                seed_artists : store.getState().top_artists_month.slice(0,2).reduce((ac,e) => ac+e.id+',','').slice(0,-1),
                seed_tracks : store.getState().top_tracks_month.slice(0,2).reduce((ac,e) => ac+e.id+',','').slice(0,-1),
                seed_genres : store.getState().top_artists_month.slice(0,1).reduce((ac,e) => e.genres[0]===undefined?ac:ac+e.genres[0]+',','').slice(0,-1)
            }
         })
        .then(resp => {
            store.dispatch(setRecommendTracks(resp.data.tracks))
            return false
        })
        .catch(err => {
            console.log(err)
            return true
        })
    }
    return new Promise((resolve) => resolve(false))
}

const calcAvgFeatures = (data) => {
    let audio = {
        "Danceability": 0,
        "Energy": 0,
        "Loudness": 0,
        "Speechiness": 0,
        "Acousticness": 0,
        "Instrumentalness": 0,
        "Liveness": 0,
        "Valence": 0,
        "Tempo": 0,
        "Duration": 0,
        "Max Duration" : 0,
        "Min Duration" : 0
    }
    for(let i of data){
        audio.Danceability += i.danceability
        audio.Energy += i.energy
        audio.Loudness += i.loudness
        audio.Speechiness += i.speechiness
        audio.Acousticness += i.acousticness
        audio.Instrumentalness += i.instrumentalness
        audio.Liveness += i.liveness
        audio.Valence += i.valence
        audio.Tempo += i.tempo
        audio.Duration += i.duration_ms
        audio["Min Duration"] = Math.max(audio["Min Duration"],i.duration_ms)
        audio["Max Duration"] = Math.max(audio["Max Duration"],i.duration_ms)
    }
    for(let i of Object.keys(audio)){
        audio[i] = Math.round(audio[i]/15*100)
    }
    audio.Loudness = Math.round(Math.abs(Math.round(audio.Loudness/100))/60*100) 
    audio.Duration = Math.round(audio.Duration/100000)
    return audio
}

export const getAudioFeatures = async () => {
    if(Object.keys(store.getState().audio_features).length === 0){
    if(store.getState().top_tracks_month.length === 0){
        let err = await getTopTracks_month()
        if(err) return new Promise((resolve) => resolve(true))
    }
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/audio-features',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            ids : store.getState().top_tracks_month.reduce((ac,e) => ac+e.id+',','').slice(0,-1),
        }
     })
    .then(resp => {
        console.log('here')
        store.dispatch(setAudioFeatures(calcAvgFeatures(resp.data.audio_features)))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }
    return new Promise((resolve) => resolve(false))
}
    
export const getArtistsCount = async () => {
    if(Object.keys(store.getState().artists_count).length === 0){
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/top/tracks',
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
            for(let artist of item.artists){
                if(out[artist.name] === undefined){
                    out[artist.name] = 1
                }else{
                    out[artist.name]++
                }
            }
        }
        store.dispatch(setArtistsCount(out))
        return false
    })
    .catch(err => {
        console.log(err)
        return true
    })
    }
    return new Promise((resolve) => resolve(false))
}

export const getCurrentlyPLaying = async () => {
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me/player',
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        }
    })
    .then(resp => resp.data === ''? {} : resp.data)
    .catch(err => {
        console.log(err)
        return {}
    })
}