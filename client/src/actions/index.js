import {constants} from '../constants/index'

export const setAccess = (payload) => {
    return {type : constants.SET_ACCESS, payload}
}

export const setRefresh = (payload) => {
    return {type : constants.SET_REFRESH, payload}
}

export const setUser = (payload) => {
    return {type : constants.SET_USER, payload}
}

export const logOut = (payload=null) => {
    return {type : constants.LOG_OUT, payload}
}

export const setTracks1 = (payload) => {
    return {type : constants.SET_TRACKS1, payload}
}

export const setTracks2 = (payload) => {
    return {type : constants.SET_TRACKS2, payload}
}

export const setTracks3 = (payload) => {
    return {type : constants.SET_TRACKS3, payload}
}

export const setArtists1 = (payload) => {
    return {type : constants.SET_ARTISTS1, payload}
}

export const setArtists2 = (payload) => {
    return {type : constants.SET_ARTISTS2, payload}
}

export const setArtists3 = (payload) => {
    return {type : constants.SET_ARTISTS3, payload}
}

export const setArtistsCount = (payload) => {
    return {type : constants.SET_ARTISTCOUNT, payload}
}

export const setGenres1 = (payload) => {
    return {type : constants.SET_GENRES1, payload}
}

export const setGenres2 = (payload) => {
    return {type : constants.SET_GENRES2, payload}
}

export const setGenres3 = (payload) => {
    return {type : constants.SET_GENRES3, payload}
}

export const setUserPlaylists = (payload) => {
    return {type : constants.SET_USERPLAYLISTS, payload}
}

export const setFeaturedPlaylists = (payload) => {
    return {type : constants.SET_FEATUREDPLAYLISTS, payload}
}

export const setRecommendTracks = (payload) => {
    return {type : constants.SET_RECOMMEND1, payload}
}

export const setRecommendArtists = (payload) => {
    return {type : constants.SET_RECOMMEND2, payload}
}

export const setAudioFeatures = (payload) => {
    return {type : constants.SET_FEATURES, payload}
}