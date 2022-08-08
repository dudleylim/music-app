import React from 'react'

const PlaybackButton = ({icon, clickFunc}) => {
    return (
        <div className='flex justify-center items-center'>
        <button onClick={() => clickFunc()} className='flex justify-center items-center rounded-full border-solid border border-white p-1.5 hover:bg-slate-50'>
            {icon}
        </button>            
        </div>
    )
}

export default PlaybackButton