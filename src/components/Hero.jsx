import React from 'react'
import {logo} from "../assets"


const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center  w-full mb-10 pt-3'>
            <img src={logo} alt='logo' className='w-28 object-contain'/>
        <button className='black_btn' type='button' onClick={()=>window.open('https://github.com/crocmons')}>
            GitHub
        </button>
        </nav>
        <h1 className='head_text'>
            Summarize Articles with <br className='max-md:hidden'/>
            <span className='orange_gradient'>
                  OpenAI GPT-4
            </span>
        </h1>
        <h2 className='desc'>
        If you have an article in mind that you'd like me to summarize, feel free to provide me with the link or text, and I'll do my best to provide a concise summary for you.
        </h2>
    </header>
  )
}

export default Hero