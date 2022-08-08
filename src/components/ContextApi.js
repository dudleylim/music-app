import React, { useState, useEffect, useRef } from 'react'
import Songs from './Songs';

const Context = React.createContext();
export default Context

export const ContextApi = ({children}) => {
    // states and functions
    const [songs, setSongs] = useState([]);
    const [index, setIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        // const getSongs = async () => {
        //     setIsLoading(true);
        //     const response = await fetch('http://localhost:5500/songs');
        //     const data = await response.json();
        //     setSongs(data);
        //     setIsLoading(false);
        // }
        // getSongs();
        setIsLoading(false);
    }, [])

    // context data
    const contextData = {
        songs,
        currentSong,
        index,
        inputRef,
        setSongs,
        setCurrentSong,
        setIndex
    }

    // return
    return (
        <Context.Provider value={contextData}>
            {!isLoading && children}
        </Context.Provider>
    )
}