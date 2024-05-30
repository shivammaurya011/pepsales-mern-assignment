import React from 'react'
import Layout from '../layouts/Layout'
import iphone from '../assets/iphone.png'
import Button from '../components/common/Button'

function Home() {
  return (
    <Layout>
      <div className='px-12 flex justify-between gap-6 flex-col sm:flex-row'>
        <div className='w-[60%] pt-4 sm:pt-12'>  
            <h1 className='text-black text-8xl font-bold'>Live <br/> Track</h1>
            <h1 className='text-blue-500 text-8xl font-bold'>Real Time.</h1>
            <p className='mb-12'>Track crypto through a public api in real time. Visit the dashboard to do so!</p>
            <Button title={'Dashboard'}/>
        </div>
        <div className='w-[40%] flex justify-center'>
            <img height={100} width={300} src={iphone} className='animate-pulse ' alt='image not found'/>
        </div>
      </div>
    </Layout>
  )
}

export default Home
