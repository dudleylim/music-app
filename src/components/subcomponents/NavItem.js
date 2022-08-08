import React from 'react'
import { BsVinyl } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const NavItem = ({icon, body, linkTo}) => {
    return (
        <Link to={linkTo} className="p-4 flex flex-row gap-8 items-center hover:bg-gradient-to-r from-slate-200 to-white">
            {icon}
            <p>{body}</p>
        </Link>
    )
}
export default NavItem

export const NavItemPlaylist = ({icon, body, addIcon, linkTo}) => {
    return (
        <Link to={linkTo} className="p-4 flex flex-row gap-8 items-center hover:bg-gradient-to-r from-slate-200 to-white">
            {icon}
            <p>{body}</p>
            <button className='ml-auto'>
                {addIcon}
            </button>
        </Link>
    )
}

export const PlaylistItem = ({body, linkTo}) => {
    return (
        <div className="p-4 flex flex-row gap-8 items-center hover:bg-gradient-to-r from-slate-200 to-white">
            <BsVinyl size={25} />
            <p>{body}</p>
        </div>
    )
}