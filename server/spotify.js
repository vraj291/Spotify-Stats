const express = require('express');
const axios = require('axios')

let scopes = encodeURIComponent(['user-top-read','playlist-modify-public','playlist-modify-private','user-read-playback-state','playlist-read-private'].reduce((ac,e) => ac+e+' ','').slice(0,-1))
let authstring = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
let loginurl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`
let tokenurl = 'https://accounts.spotify.com/api/token'

let router = express.Router()

router.get('/login', (req, res) => {
    res.redirect(loginurl);
})

router.get('/callback', (req, res) => {
    if (req.query.code == undefined){
        let url = `${process.env.FRONTEND_URI}/?error=`+encodeURIComponent(req.query.error)
        res.redirect(url)
    }else{
        axios({
            method : 'post',
            url : tokenurl,
            headers : {
                'Accept':'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Basic ${authstring}`
            },
            params : {
                grant_type : 'authorization_code',
                code : req.query.code,
                redirect_uri : process.env.REDIRECT_URI,
            }
        })
        .then(resp => {
            let acc_token = resp.data.access_token
            let ref_token = resp.data.refresh_token
            let url = `${process.env.FRONTEND_URI}/?access=`+encodeURIComponent(acc_token)+'&refresh='+encodeURIComponent(ref_token)
            res.redirect(url)
        })
        .catch(err => {
            let url = `${process.env.FRONTEND_URI}/?error=`+encodeURIComponent('No Access Token')
            res.redirect(url)
        })
    }
})

router.get('/refresh_token', (req, res) => {
    let ref_token = req.query.refresh_token
    axios({
        method : 'post',
        url : tokenurl,
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Basic ${authstring}`
        },
        params : {
            grant_type : 'refresh_token',
            refresh_token : ref_token
            }
     })
    .then(resp => {
        res.send({
            access_token : resp.data.access_token
        })
    })
    .catch(err => {
        res.send({
            access_token : ''
        })
    })
})

module.exports = router