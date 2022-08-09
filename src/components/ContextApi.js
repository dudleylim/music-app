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
        setInitialized
    }

    // return
    return (
        <Context.Provider value={contextData}>
            {!isLoading && children}
        </Context.Provider>
    )
}