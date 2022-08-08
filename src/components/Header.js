import React from 'react'
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { BsMusicNoteBeamed, BsSoundwave } from 'react-icons/bs';
import { CgPlayList } from 'react-icons/cg';
import NavItem from './subcomponents/NavItem';
import { NavItemPlaylist, PlaylistItem } from './subcomponents/NavItem';

const Header = () => {
    return (
        <header className='flex flex-col overflow-y-auto'>
            <div>
                <button className='p-4 hover:bg-slate-400'><AiOutlineMenu size={28}/></button>
            </div>

            <div className='p-2 flex flex-row'>
                <input type="text" name="search" className="w-full p-2 bg-inherit" placeholder='Search...' />
                <button><AiOutlineClose size={25}/></button>
                <button><AiOutlineSearch  size={25}/></button>
            </div>

            <nav className='flex flex-col overflow-y-auto bg-white h-full'>
                <NavItem linkTo={'/'} icon={<BsMusicNoteBeamed size={25} />} body={'My music'} />
                <NavItem linkTo={'/'} icon={<BsSoundwave size={25} />} body={'Now playing'} />
                <hr />
                <NavItemPlaylist linkTo={'/playlists'} icon={<CgPlayList size={25} />} body={'Playlists'} addIcon={<AiOutlinePlus size={25} />}  />
                <PlaylistItem body={'1'} />
                <PlaylistItem body={'1'} />
                <PlaylistItem body={'1'} />
                <PlaylistItem body={'1'} />
                <PlaylistItem body={'1'} />
                <PlaylistItem body={'1'} />
                <PlaylistItem body={'1'} />
                <PlaylistItem body={'1'} />

            </nav>
        </header>
    )
}

export default Header