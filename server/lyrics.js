const express = require('express');
const axios = require('axios');

let router = express.Router()

router.get('/search',(req,res) => {
    console.log(req.query)
    axios({
        method : 'get',
        url : `http://api.musixmatch.com/ws/1.1/matcher.track.get`,
        params : {
            "apikey" : "976a27f996ac633ea078e71acf258c80",
            "q_artist" : 'eminem',
            "q_track": 'lose yourself'
        }
    })
    .then(resp => {
        let id = resp.data.message.body.track.commontrack_id
        axios({
            method : 'get',
            url : `http://api.musixmatch.com/ws/1.1/track.lyrics.mood.get`,
            params : {
                "apikey" : "976a27f996ac633ea078e71acf258c80",
                "commontrack_id" : id
            }
        })
        .then(resp => {
            console.log(resp.data)
            res.send(resp.data.message.body)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router