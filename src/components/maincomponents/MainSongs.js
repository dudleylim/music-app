import React, { useState, useContext } from 'react'
import Context from '../ContextApi'
import MainHeading from './MainHeading';

const MainSongs = () => {
    const contextApi = useContext(Context);

    return (
        <>
        <MainHeading body={'My Music'}/>
        <section>
            <ul className='flex flex-col'>
            {contextApi.initialized &&
                Object.entries(contextApi.songs).map((song) => {
                    // each song entry is an array of [id, file details], thus we use song[0] as id, and we access the song name using song[1].name
                    return <li key={song[0]} className="p-4 odd:bg-slate-50 even:bg-slate-200 hover:bg-slate-300">{song[1].name}</li>
                })
            }
            </ul>
        </section>
        </>
    )
}

export default MainSongs