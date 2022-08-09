import React, { useState, useEffect, useRef } from 'react'

const Context = React.createContext();
export default Context

export const ContextApi = ({children}) => {
    // states and functions
    const [songs, setSongs] = useState([]);
    const [songQueue, setSongQueue] = useState([]);
    const [index, setIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState('');
    const [initialized, setInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef(null);

    // shuffle function
    const shuffleSong = () => {
        const tempKeys = Object.keys(songs);
        
        // https://bost.ocks.org/mike/shuffle/
        let m = tempKeys.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);

            t = tempKeys[m];
            tempKeys[m] = tempKeys[i];
            tempKeys[i] = t;
        }
        console.log(tempKeys);

        const tempSongs = {};
        for (let i = 0; i < tempKeys.length; i++) {
            tempSongs[i] = songs[tempKeys[i]];
        }
        // tempSongs['length'] = tempKeys.length;
        setSongQueue(tempSongs);
        console.log(tempSongs);
    }
    const sortSong = () => {
        setSongQueue(songs);
    }

    useEffect(() => {
        setSongQueue(songs);
        setIsLoading(false);
    }, [songs])

    // context data
    const contextData = {
        songs,
        songQueue,
        currentSong,
        index,
        inputRef,
        initialized,
        setSongs,
        setSongQueue,
        setCurrentSong,
        setIndex,
        setInitialized,
        shuffleSong, sortSong
    }

    // return
    return (
        <Context.Provider value={contextData}>
            {!isLoading && children}
        </Context.Provider>
    )
}