import React from 'react'
import Chart from 'react-apexcharts'
import './Chart.css'

export const GenresChart = ({type,data}) => {    
    return(
        <div className='chart-wrapper'>
            <Chart 
                type='treemap'
                series ={[
                    {
                      name: "Top Genres",
                      data: data
                    }
                  ]}
                options = {{
                    title : {
                        text : type,
                        align : 'center',
                        offsetY : 20,
                        style: {
                            fontSize:  '1.4rem',
                            fontWeight:  'bold',
                            color:  '#1ed760'
                        }
                    },
                    // chart: {
                    //     zoom: {
                    //         enabled: true
                    //     }
                    // },
                    dataLabels: {
                        enabled: true,
                        style: {
                          fontSize: '16px',
                        },
                        formatter: function(text, op) {
                          return [text.toUpperCase(), (op.value+' songs')]
                        },
                        offsetY: -4
                    },
                    plotOptions: {
                        treemap: {
                          distributed: true
                        }
                    }
                }}
            />
        </div>
    )
}