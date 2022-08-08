import React, { useState, useRef, useContext, useEffect } from 'react'
import pic from '../assets/images/smug.png';
import song from '../assets/songs/song1.mp3';
import Context from './ContextApi';
import PlaybackButton from './subcomponents/PlaybackButton';
import InputSongs from './InputSongs';
import { BsPlay, BsPause, BsShuffle } from 'react-icons/bs';
import { MdSkipPrevious, MdSkipNext, MdOutlineRepeat, MdOutlineRepeatOne } from 'react-icons/md';

const SongFooter = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const player = useRef();
    const contextApi = useContext(Context);

    const togglePlay = () => {
        const prevValue = isPlaying;
        console.log(contextApi.currentSong);
        console.log(contextApi.songs);
        setIsPlaying(!prevValue);
        if (!prevValue) {
            player.current.play();
        } else {
            player.current.pause();
        }
    }

    const toggleShuffle = () => {
        const prevValue = isShuffling;
        setIsShuffling(!prevValue);
    }

    const toggleRepeat = () => {
        const prevValue = isRepeating;
        setIsRepeating(!prevValue);
    }

    const skipNext = () => {
        const prevIndex = contextApi.index;
        let newIndex;
        if (prevIndex === contextApi.songs.length - 1) {
            newIndex = 0;
            contextApi.setIndex(newIndex);
        } else {
            newIndex = prevIndex + 1;
            contextApi.setIndex(newIndex);
        }
        try {
            contextApi.setCurrentSong(URL.createObjectURL(contextApi.songs[newIndex]))
            console.log(newIndex)
        } catch (err) {
            console.log(err);
        }
    }

    const skipPrevious = () => {
        const prevIndex = contextApi.index;
        let newIndex;
        if (prevIndex === 0) {
            newIndex = contextApi.songs.length - 1
            contextApi.setIndex(newIndex);
        } else {
            newIndex = prevIndex - 1;
            contextApi.setIndex(newIndex);
        }
        try {
            contextApi.setCurrentSong(URL.createObjectURL(contextApi.songs[newIndex]))
            console.log(newIndex)
        } catch (err) {
            console.log(err);
        }
    }

    const onPlaying = () => {
        const currentTime = player.current.currentTime;
        const duration = player.current.duration;
    }

    return (
        <footer className='flex flex-row justify-between'>
            <section className='flex flex-row flex-1 bg-slate-50'>
                <img src={pic} alt="" className='w-20 h-full' />
                <div className="flex flex-col justify-center px-4 w-full">
                    <h3>Song Name</h3>
                    <p className='font-bold'>Artist</p>
                </div>
            </section>

            <section className='flex flex-col flex-1 basis-1/5 bg-slate-200 justify-center items-center gap-3'>
                <audio ref={player} src={contextApi.currentSong} onTimeUpdate={onPlaying} />
                <div className="flex flex-row w-full justify-center gap-4">
                    <PlaybackButton icon={<BsShuffle size={20} />} clickFunc={toggleShuffle} />
                    <PlaybackButton icon={<MdSkipPrevious size={20} />} clickFunc={skipPrevious} />
                    {isPlaying ? 
                    <PlaybackButton icon={<BsPause size={30}/>} clickFunc={togglePlay} />
                    :
                    <PlaybackButton icon={<BsPlay size={30}/>} clickFunc={togglePlay} />
                    }
                    <PlaybackButton icon={<MdSkipNext size={20}/>} clickFunc={skipNext} />
                    {isRepeating ?
                    <PlaybackButton icon={<MdOutlineRepeatOne size={20}/>} clickFunc={toggleRepeat} />
                    :
                    <PlaybackButton icon={<MdOutlineRepeat size={20}/>} clickFunc={toggleRepeat} />
                    }
                    
                </div>
                <div className="flex flex-row">
                    <p>elapsed</p>
                    <input type="range" name="" id="" />
                    <p>duration</p>
                </div>                
            </section>

            <section className='flex-1 bg-slate-400'>
                <InputSongs />
            </section>
        </footer>
    )
}

export default SongFooter