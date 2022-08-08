import React, { useState, useContext } from 'react'
import Context from '../ContextApi'

const MainSongs = () => {
    const contextApi = useContext(Context);

    return (
        <>
        <h1>My Music</h1>
        <hr />
        <section>
            <ul>
            </ul>
        </section>
        </>
    )
}

export default MainSongs