import React, { useState, useEffect, useRef } from 'react'

const Context = React.createContext();
export default Context

export const ContextApi = ({children}) => {
    // states and functions
    const [songs, setSongs] = useState([]);
    const [index, setIndex] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [currentSong, setCurrentSong] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    // context data
    const contextData = {
        songs,
        currentSong,
        index,
        inputRef,
        initialized,
        setSongs,
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