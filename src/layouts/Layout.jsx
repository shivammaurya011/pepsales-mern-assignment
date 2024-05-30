import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

function Layout({children}) {
  return (
    <div>
      <Header/>
      <main className='pt-20'>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
