import React, { useContext } from 'react'
import Context from './ContextApi';

const InputSongs = () => {
    const contextApi = useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        const files = contextApi.inputRef.current.files;
        if (files.length === 0) {
            console.log('No files detected');
        } else {
            console.log(files);
            // reset index to 0
            contextApi.setIndex(0);

            // set songs to inputted files
            contextApi.setSongs(files);

            // set current song to first index
            contextApi.setCurrentSong(URL.createObjectURL(files[contextApi.index]));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={contextApi.inputRef} type="file" multiple accept='audio/mpeg' disabled={contextApi.initialized} />
            <button type="submit" disabled={contextApi.initialized}>Submit</button>
        </form>
    )
}

export default InputSongs