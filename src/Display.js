import React from 'react'

export default function Display({blogs}) {
  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>Blogs</h1>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className='text-lg'>{blog.title}</li>
        ))}
      </ul>
    </div>
    
  )
}
