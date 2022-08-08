import React from 'react'

const MainHeading = ({body}) => {
    return (
        <section className='border-b border-gray-400 p-6 pb-4 mb-4'>
            <h1 className='font-semibold text-4xl'>{body}</h1>
        </section>
    )
}

export default MainHeading