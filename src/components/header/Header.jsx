import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../common/Button'

function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 py-4 px-12 flex justify-between items-center bg-white z-50'>
      <div>
        <Link className='text-3xl font-bold' to={'/'}>LiveTrade<span className='text-blue-500'>.</span></Link>
      </div>
      <nav className='sm:block hidden'>
        <ul className='list-none flex gap-4 font-semibold '>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          {/* <li>
            <Link to={'/about'}>About</Link>
          </li>
          <li>
            <Link to={'/contact'}>Contact</Link>
          </li> */}
        </ul>
      </nav>
      <div>
        <Button title={"Dashboard"}/>
      </div>
    </header>
  )
}

export default Header
