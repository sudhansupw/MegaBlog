import React from 'react'
import appwriteService from "../appwrite/config.js"
import {Link} from "react-router-dom"

function PostCard({$id, title, featuredimage}) {
    
    return (
      <Link to={`/post/${$id}`} className='h-full'>
          <div className='w-full bg-gray-100 rounded-xl p-4 h-full'>
              <div className='w-full justify-center mb-4 h-[85%]'>
              {featuredimage && (
                <img src={appwriteService.getFilePreview(featuredimage)} alt={title}
                  className='rounded-xl' />

                )}
  
              </div>
              <h2
              className='text-xl font-bold'
              >{title}</h2>
          </div>
      </Link>
    )
  }
  
  
  export default PostCard