import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import {getAudioFeatures} from '../../spotify/tracks'
import store from '../../store'
import './Chart.css'

export const FeatureChart = () => {

    const [data,setData] = useState([])

    useEffect(() => {
        getAudioFeatures().then(() => {
            setData(Object.values(store.getState().audio_features).slice(0,8))
        })
    },[])

    return(
        <div className='chart-wrapper'>
            <Chart 
                type='radar'
                height={480}
                series ={[
                    {
                      name: "Audio Features",
                      data: data
                    }
                  ]}
                options = {{
                    title : {
                        text : 'Audio Features based on Recently Listened',
                        align : 'center',
                        offsetY : 20,
                        style: {
                            fontSize:  '1.4rem',
                            fontWeight:  'bold',
                            color:  '#1ed760'
                        }
                    },
                    fill: {
                        opacity: 0.3,
                        colors: ['#1ed760']
                    },
                    stroke: {
                        show: true,
                        width: 3,
                        colors: ['#1ed760'],
                        dashArray: 0
                    },
                    xaxis: {
                        categories: ['Danceability','Energy','Loudness','Speechiness','Acousticness','Instrumentalness','Liveness','Valence'],
                        labels: {
                            show: true,
                            style: {
                                colors: ['#1ed760','#1ed760','#1ed760','#1ed760','#1ed760','#1ed760','#1ed760','#1ed760'],
                                fontSize: "1rem",
                                fontFamily: 'Arial'
                            }
                        }
                    },
                    yaxis : {
                        show : false
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val, opts) {
                            return val+'%'
                        },
                        background: {
                            enabled: true,
                            borderRadius: 2,
                            opacity: 0.8
                        },
                        style: {
                            colors: ['#1ed760','#1ed760','#1ed760','#1ed760','#1ed760','#1ed760',],
                            fontSize: "0.7rem",
                            fontFamily: 'Arial'
                        }
                    },
                    plotOptions: {
                        radar: {
                          polygons: {
                            strokeColor: '#e8e8e8',
                            fill: {
                                colors: ['#f8f8f8', '#c8ccca']
                            }
                          }
                        }
                      }
                }}
            />
        </div>
    )
}