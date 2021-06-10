import {constants} from '../constants/index'

const initialState = {
    access_token: '',
    refresh_token: '',
    user : {},
    top_tracks_month: [],
    top_tracks_6month: [],
    top_tracks_alltime: [],
    top_artists_month: [],
    top_artists_6month: [],
    top_artists_alltime: [],
    top_genres_month: [],
    top_genres_6month: [],
    top_genres_alltime: [],
    user_playlists: [],
    featured_playlists: [],
    recommended_tracks: [],
    recommended_artists: [],
    audio_features : {},
    artists_count : {}
}

const rootReducer = (state = initialState,action) => {
    switch(action.type){
        case constants.SET_ACCESS:
            return Object.assign({},state,{access_token : action.payload})
        case constants.SET_REFRESH:
            return Object.assign({},state,{refresh_token : action.payload})
        case constants.SET_USER:
            return Object.assign({},state,{user : action.payload})
        case constants.SET_TRACKS1:
            return Object.assign({},state,{top_tracks_month : action.payload})
        case constants.SET_TRACKS2:
            return Object.assign({},state,{top_tracks_6month : action.payload})
        case constants.SET_TRACKS3:
            return Object.assign({},state,{top_tracks_alltime : action.payload})
        case constants.SET_ARTISTS1:
            return Object.assign({},state,{top_artists_month : action.payload})
        case constants.SET_ARTISTS2:
            return Object.assign({},state,{top_artists_6month : action.payload})
        case constants.SET_ARTISTS3:
            return Object.assign({},state,{top_artists_alltime : action.payload})
        case constants.SET_GENRES1:
            return Object.assign({},state,{top_genres_month : action.payload})
        case constants.SET_GENRES2:
            return Object.assign({},state,{top_genres_6month : action.payload})
        case constants.SET_GENRES3:
            return Object.assign({},state,{top_genres_alltime : action.payload})
        case constants.SET_ARTISTCOUNT:
            return Object.assign({},state,{artists_count : action.payload})
        case constants.SET_USERPLAYLISTS:
            return Object.assign({},state,{user_playlists : action.payload})
        case constants.SET_FEATUREDPLAYLISTS:
            return Object.assign({},state,{featured_playlists : action.payload})
        case constants.SET_RECOMMEND1:
            return Object.assign({},state,{recommended_tracks : action.payload})
        case constants.SET_RECOMMEND2:
            return Object.assign({},state,{recommended_artists : action.payload})
        case constants.SET_FEATURES:
            return Object.assign({},state,{audio_features : action.payload})
        case constants.LOG_OUT:
            return Object.assign({},initialState)
        default:
            return state
    }
}

export default rootReducer