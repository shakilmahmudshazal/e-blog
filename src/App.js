import React, { useState, useEffect } from 'react';
import { db } from './config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editBlogId, setEditBlogId] = useState(null);

  // Fetch blogs from Firestore on component load
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, 'blogs');
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      try {
        if (editBlogId) {
          // Update existing blog
          const blogRef = doc(db, 'blogs', editBlogId);
          await updateDoc(blogRef, formData);
          setBlogs(blogs.map((blog) => (blog.id === editBlogId ? { id: blog.id, ...formData } : blog)));
          setEditBlogId(null);
        } else {
          // Add new blog
          const docRef = await addDoc(collection(db, 'blogs'), formData);
          setBlogs([...blogs, { id: docRef.id, ...formData }]);
        }
        setFormData({ title: '', content: '' });
      } catch (error) {
        console.error('Error saving document: ', error);
      }
    }
  };

  const onEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content });
    setEditBlogId(blog.id);
  };

  const onDelete = async (id) => {
    try {
      const blogRef = doc(db, 'blogs', id);
      await deleteDoc(blogRef);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-8 bg-gray-300">
      {/* Blog Submission Form */}
      <form onSubmit={onSubmit} className="mb-8 bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4">{editBlogId ? 'Edit Blog' : 'Add a New Blog'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog content"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {editBlogId ? 'Update' : 'Submit'}
        </button>
      </form>

      {/* Display Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200"
          >
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-700 mb-4">{blog.content}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => onEdit(blog)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(blog.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
