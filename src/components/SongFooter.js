import React, { useState, useRef, useContext, useEffect } from 'react'
import pic from '../assets/images/smug.png';
import Context from './ContextApi';
import PlaybackButton from './subcomponents/PlaybackButton';
import InputSongs from './InputSongs';
import { BsPlay, BsPause, BsShuffle, BsFillVolumeUpFill } from 'react-icons/bs';
import { MdSkipPrevious, MdSkipNext, MdOutlineRepeat, MdOutlineRepeatOne } from 'react-icons/md';

const SongFooter = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false); // repeating is playlist playing from the start after last song
    const [isLooping, setIsLooping] = useState(false); // looping is looping the same song after it is finished
    const [isShuffling, setIsShuffling] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volumeAmount, setVolumeAmount] = useState(0);
    const player = useRef();
    const progress = useRef();
    const volume = useRef();
    const contextApi = useContext(Context);

    // functions
    const togglePlay = () => {
        const prevValue = isPlaying;
        console.log(contextApi.currentSong);
        console.log(contextApi.songQueue[contextApi.index]);
        setIsPlaying(!prevValue);
        if (!prevValue) {
            player.current.play();
        } else {
            player.current.pause();
        }
    }
    const forcePlay = () => {
        player.current.play();
        setTimeout(() => {
            setIsPlaying(true);            
        }, 50);
    }

    const toggleShuffle = () => {
        const prevValue = isShuffling;
        setIsShuffling(!prevValue);
        if (prevValue === false) {
            contextApi.shuffleSong();
        } else {
            contextApi.sortSong();
        }
    }

    const toggleRepeat = () => {
        const prevRepeating = isRepeating;
        const prevLooping = isLooping;
        if (!prevRepeating && !prevLooping) {
            setIsRepeating(!prevRepeating);
        } else if (prevRepeating && !prevLooping) {
            setIsRepeating(!prevRepeating);
            setIsLooping(!prevLooping);
        } else {
            setIsRepeating(false);
            setIsLooping(false);
        }
    }

    const skipNext = () => {
        const prevIndex = contextApi.index;
        let newIndex;
        if (prevIndex === Object.keys(contextApi.songQueue).length - 1) {
            newIndex = 0;
            contextApi.setIndex(newIndex);
        } else {
            newIndex = prevIndex + 1;
            contextApi.setIndex(newIndex);
        }
        try {
            contextApi.setCurrentSong(URL.createObjectURL(contextApi.songQueue[newIndex]))
            console.log(newIndex)
        } catch (err) {
            console.log(err);
        }
    }

    const skipPrevious = () => {
        const prevIndex = contextApi.index;
        let newIndex;
        if (prevIndex === 0) {
            newIndex = Object.keys(contextApi.songQueue).length - 1;
            contextApi.setIndex(newIndex);
        } else {
            newIndex = prevIndex - 1;
            contextApi.setIndex(newIndex);
        }
        try {
            contextApi.setCurrentSong(URL.createObjectURL(contextApi.songQueue[newIndex]))
            console.log(newIndex)
        } catch (err) {
            console.log(err);
        }
    }

    const calcTime = (seconds) => {
        let minutes = String(Math.floor(seconds / 60));
        let newSeconds = String(Math.floor(seconds - (minutes * 60)));
        if (minutes.length < 2) { minutes = '0' + minutes }
        if (newSeconds.length < 2) { newSeconds = '0' + newSeconds }
        const time = `${minutes}:${newSeconds}`;
        return time;
    }

    // https://www.w3schools.com/tags/ref_av_dom.asp
    // fires when audio is playing the file; fires every 250ms
    const onPlaying = () => {
        // set elapsed time of currently playing song
        const currentTime = player.current.currentTime;
        setElapsed(calcTime(currentTime));

        // update progress bar
        progress.current.value = player.current.currentTime;

        // autoplay next song if current song finishes
        // condition: if looping, set currentTime instead to start of song 
        if (player.current.currentTime === player.current.duration) {
            if (isLooping) {
                player.current.currentTime = 0.1;
                forcePlay();
            } else {
                skipNext();
            }
        }
    }

    // fires when audio player is able to play through the whole song
    const onLoad = () => {
        // set the duration of the song
        const duration = player.current.duration;
        setDuration(calcTime(duration));

        // set the progress bar to the duration
        progress.current.max = player.current.duration;

        // reset play button
        setIsPlaying(false);

        // set default volume value
        volume.current.value = 100;

        // initialize player
        contextApi.setInitialized(true);

        if (isPlaying && isRepeating) {
            forcePlay();
        }
    }

    const onSeek = () => {
        if (isPlaying) {
            togglePlay();
        }
        player.current.currentTime = progress.current.value;
        const currentTime = player.current.currentTime;
        setElapsed(calcTime(currentTime));
        console.log(isPlaying);
    }

    const changeSht = () => {
        player.current.currentTime = player.current.duration / 2;
        setElapsed(calcTime(player.current.currentTime));
        if (isPlaying) {
            forcePlay();
        }
    }

    const onVolumeChange = () => {
        // volume.current.value = player.current.volume;
        player.current.volume = volume.current.value / 100;
        setVolumeAmount(player.current.volume);
    }

    return (
        <footer className='flex flex-row justify-between'>
            <section className='flex flex-row flex-1 bg-slate-50'>
                <img src={pic} alt="" className='w-20 h-full' />
                <div className="flex flex-col justify-center px-4 w-full">
                    <h3>{contextApi.initialized ? contextApi.songQueue[contextApi.index].name : "--"}</h3>
                </div>
            </section>

            <section className='flex flex-col flex-1 basis-1/5 bg-slate-200 justify-center items-center gap-3'>
                <audio ref={player} src={contextApi.currentSong} onCanPlayThrough={onLoad} onTimeUpdate={onPlaying} />

                <div className="flex flex-row w-full justify-center gap-4">
                    <PlaybackButton icon={<BsShuffle size={20} />} clickFunc={toggleShuffle} activated={isShuffling} />
                    <PlaybackButton icon={<MdSkipPrevious size={20} />} clickFunc={skipPrevious} />
                    {isPlaying ? 
                    <PlaybackButton icon={<BsPause size={30}/>} clickFunc={togglePlay} />
                    :
                    <PlaybackButton icon={<BsPlay size={30}/>} clickFunc={togglePlay} />
                    }
                    <PlaybackButton icon={<MdSkipNext size={20}/>} clickFunc={skipNext} />
                    {isLooping ?
                    <PlaybackButton icon={<MdOutlineRepeatOne size={20}/>} clickFunc={toggleRepeat} activated={isLooping} />
                    :
                    <PlaybackButton icon={<MdOutlineRepeat size={20}/>} clickFunc={toggleRepeat} activated={isRepeating} />
                    }
                    <PlaybackButton icon={<MdOutlineRepeat size={20}/>} clickFunc={changeSht} />
                </div>

                <div className="flex flex-row justify-between gap-2 w-full px-8">
                    <p>{elapsed === 0 ? "--" : elapsed}</p>
                    <input ref={progress} type="range" id='progress' onChange={onSeek} disabled={!contextApi.initialized} className="basis-4/5" />
                    <p>{duration === 0 ? "--" : duration}</p>
                </div>  
            </section>

            <section className='flex flex-col justify-center items-center flex-1 bg-slate-400'>
                <div className='flex flex-row gap-2'>
                    <BsFillVolumeUpFill size={20} />
                    <input ref={volume} type="range" name="volume" id="volume" onChange={onVolumeChange} disabled={!contextApi.initialized} />
                </div>
                <InputSongs />
            </section>
        </footer>
    )
}

export default SongFooter