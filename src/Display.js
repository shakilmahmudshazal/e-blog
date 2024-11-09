import React from 'react'

export default function Display({blogs}) {
  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>Blogs</h1>
      <ul>
        {blogs && blogs.map((blog, index) => (
            <li key={index} className='border p-4 my-2'>
                <h3 className='text-xl font-bold'>{blog.title}</h3>
                <p>{blog.description}</p>
            </li>
        ))}
      </ul>
    </div>
    
  )
}
