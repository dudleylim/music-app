import React from 'react'
import { Routes, Route } from 'react-router-dom';
import MainSongs from './maincomponents/MainSongs';
import MainNowPlaying from './maincomponents/MainNowPlaying';
import MainPlaylists from './maincomponents/MainPlaylists';
import MainPlaylistSpecific from './maincomponents/MainPlaylistSpecific';

const Main = () => {
    return (
        <main className='bg-slate-50'>
            <Routes>
                <Route path='/' exact element={<MainSongs />} />
                <Route path='/nowplaying' exact element={<MainNowPlaying />} />
                <Route path='/playlists' exact element={<MainPlaylists />} />
            </Routes>
        </main>
    )
}

export default Main