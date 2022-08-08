import React, {useContext} from 'react'
import Context from '../ContextApi'

const PlaybackButton = ({icon, clickFunc}) => {
    const contextApi = useContext(Context);

    return (
        <div className='flex justify-center items-center'>
        <button onClick={() => clickFunc()} disabled={!contextApi.initialized} className='flex justify-center items-center rounded-full border-solid border border-white p-1.5 hover:bg-slate-50'>
            {icon}
        </button>            
        </div>
    )
}

export default PlaybackButton