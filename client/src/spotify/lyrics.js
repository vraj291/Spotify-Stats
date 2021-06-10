import axios from 'axios'
import store from '../store/index'

export const searchLyrics = (lyric) => {
    return axios({
        method : 'get',
        url : `https://api.spotify.com/v1/search`,
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${store.getState().access_token}`
        },
        params : {
            "q" : lyric,
            "type" : 'track',
            "limit" : '5'
        }
    })
    .then(resp => {
        console.log(resp.data)
    })
    .catch(err => console.log(err))
}
