import React from 'react'
import { Link } from 'react-router-dom'

function Button({title}) {
  return (
    <Link className='px-6 py-2 text-base font-semibold bg-blue-500 rounded-full text-white hover:shadow-blue-400 hover:shadow-md' to={'/dashboard'}>{title}</Link>
  )
}

export default Button
