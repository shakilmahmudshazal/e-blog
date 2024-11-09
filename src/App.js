import './App.css';
import React, {useState} from 'react';
import Display from './Display';
function App() {
  const [blogs, setblogs] = useState(0);

  return (
    <div className="max-w-[1400px] mx-auto p-8">
        <form className=''>
          <div className='input-container'>
            <input className='bg-red-200' type="text" placeholder="Enter Blog Title" />
          </div>
          <div className='input-container'>
           <input className='bg-green-300' type="text" placeholder="Enter Blog Description" />
            </div>
        
          <button className='btn btn-primary' onClick={() => setblogs(blogs + 1)}>Add Blog</button>
        </form>
    </div>
  );
}

export default App;
