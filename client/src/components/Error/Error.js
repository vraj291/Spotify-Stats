import React from "react"
import error from '../../assets/error.svg'
import './Error.css'

export const Error = ({height,fontsize}) => {
    return(
        <div className='error'>
            <img src={error} height={height}/>
            <div className='error-msg' style={{fontSize:fontsize}}>An Error Occurred</div>
        </div>
    )
}