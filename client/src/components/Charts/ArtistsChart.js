import React, { useEffect, useState } from 'react'
import { getArtistsCount } from '../../spotify/tracks'
import Chart from 'react-apexcharts'
import './Chart.css'
import { Error } from '../Error/Error'
import store from '../../store'

export const ArtistsChart = () => {

    const [data,setData] = useState([])
    const [isError,setError] = useState(false)
    
    useEffect(() => {
        getArtistsCount().then(err => {
            if(err){
                setError(true)
            }else{
                let data=[]
                let out = store.getState().artists_count
                for(let item of Object.keys(out)){
                    data.push({
                        x : item,
                        y : out[item]
                    })
                }
                setData(data)
                setError(false)
            }
        })
    },[])

    return(
        <div className='chart-wrapper'>
            {isError?
            <Error height='200px' fontsize='1.2rem'/> : 
            <Chart 
                type='treemap'
                series ={[
                    {
                      name: "Top 50 Artists",
                      data: data
                    }
                  ]}
                options = {{
                    title : {
                        text : 'Top 50 Artists',
                        align : 'center',
                        offsetY : 20,
                        style: {
                            fontSize:  '1.4rem',
                            fontWeight:  'bold',
                            color:  '#1ed760'
                        }
                    },
                    chart: {
                        zoom: {
                            enabled: true
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                          fontSize: '16px',
                        },
                        formatter: function(text, op) {
                          return [text, (op.value+' songs')]
                        },
                        offsetY: -4
                    },
                    plotOptions: {
                        treemap: {
                          distributed: true
                        }
                    }
                }}
            />}
        </div>
    )
}