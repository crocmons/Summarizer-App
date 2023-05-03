import React from 'react'
import { useState, useEffect } from 'react'
import {copy,linkIcon,loader, tick} from "../assets"
import { useLazyGetSummaryQuery } from '../services/article'

const Article = () => {
    const [article, setArticle] = useState({
       url:'',
       summary:''
    })

    const [allarticles,setAllArticles] = useState([]);

    const [copied, setCopied] = useState('')

    const [getSummary,{error,isFetching}] = useLazyGetSummaryQuery();

    // load data from localstorage on mount
       useEffect(() => {
          
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('articles')
        );

        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage)
        }

       }, []);
       

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {data} = await getSummary({articleUrl:article.url}) 

        if(data?.summary){
            const newArticle = {...article, summary:data.summary};
            
            const updatedAllArticles = [newArticle, ...allarticles];

            // update state and local storage
            setArticle(newArticle)
            setAllArticles(updatedAllArticles)

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
        }
    }

     // copy the url and toggle the icon for user feedback
    const handleCopy =(copyurl)=>{
        setCopied(copyurl)
        navigator.clipboard.writeText(copyurl);
        setTimeout(()=>setCopied(false),3000)
    }

  return (
    <section className='mt-16 w-full max-w-xl'>
       {/* search field */}
       <div className='flex flex-col w-full gap-2'>
          <form
            className='relative flex justify-center items-center'
            onSubmit={handleSubmit}
          >
            <img src={linkIcon} alt='link-icon' className='absolute left-0 my-2 ml-3 w-5'/>

            <input type='url' placeholder='Enter a URL' value={article.url} onChange={(e)=>setArticle({...article, url:e.target.value})} required className='url_input peer'/>

            <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
                ↩
            </button>
          </form>

          {/* Browser URL History */}
         
           <div className='flex flex-col gap-1 overflow-y-auto max-h-60'>
               {allarticles.map((articles,index)=>(
                     <div 
                      key={`link-${index}`}
                      onClick={()=>setArticle(articles)}
                      className='link_card'
                     >
                        <div className='copy_btn' onClick={()=>handleCopy(articles.url)}>
                            <img 
                            src={copied === articles.url ? tick : copy} 
                            alt={copied === articles.url ? 'tick_icon' : 'copy_icon'}
                            className='w-[40%] h-[40%] object-contain'
                            />
                        </div>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{articles.url}</p>
                       
                    </div>
               ))}
           </div>
       </div>

       {/* Display Results */}

       <div className='my-10 max-w-full flex justify-center items-center'>
          {isFetching ? (
             <img
              src={loader}
              alt='loader'
              className='w-20 h-20 object-contain'
             />
          ) : error ? (
            <p className='font-inter font-bold text-red-600 text-center'>
                Something Went Wrong!
                <br />
                <span>{error?.data?.error}</span>
            </p>
          ) : (
            article.summary && (
                <div className='flex flex-col gap-3'>
                   <h2 className='orange_gradient font-satoshi text-2xl font-extrabold'>
                      Article  <span className='blue_gradient'>Summarize</span>
                   </h2>
                   <div className='summary_box'>
                     <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                   </div>
                </div>
            )
          )}
       </div>
    </section>
  )
}

export default Article