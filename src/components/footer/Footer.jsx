import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-blue-500 text-center p-4 rounded-full mx-12 mb-6'>
      <Link className='text-3xl text-white font-bold' to={'/'}>LiveTrade<span className='text-white'>.</span></Link>
    </footer>
  )
}

export default Footer
