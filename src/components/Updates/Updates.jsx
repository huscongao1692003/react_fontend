import { UpdatesData } from '@/src/data/Data'
import React from 'react'

const Updates = () => {
  return (
    <div className='Updates'>
        {UpdatesData.map((update)=>{
            return(
                <div className='update'>
                    <img src={update} alt=''/>
                    <div className='noti'>
                        <div style={{marginBottom: '0.5rem'}}>
                            <span>{update.name}</span>
                            <span>{update.noti}</span>
                        </div>
                    </div>
                    <div>
                        <span>{update.time}</span>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Updates
