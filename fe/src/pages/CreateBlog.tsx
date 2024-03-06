import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); 

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No token found, please login first.');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('https://be.ullegadda-srikanta.workers.dev/api/v1/blog/create', {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Blog post created successfully!');
      setTitle(''); 
      setContent(''); 
    } catch (error) {
      console.error('Error creating blog post:', error);
      setMessage('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="m-1 p-2 block w-full rounded-md border-gray-300 shadow-sm border-2 focus:ring-blue-500 focus:border-black"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="m-1 p-2 block w-full rounded-md border-gray-300 shadow-sm border-2 focus:ring-blue-500 focus:border-black"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white ${isSubmitting ? 'bg-blue-300 hover:bg-blue-300' : 'bg-slate-600 hover:bg-slate-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
        >
          {isSubmitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
      {message && (
        <div className="mt-6 text-center">
          <p className={`text-md font-semibold ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
          <button
            onClick={handleBackToDashboard}
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};
