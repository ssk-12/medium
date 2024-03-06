import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Appbar } from '../Appbar';

type Author = {
  name: string | null;
};

type BlogPost = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: Author;
};

export const BlogPostDetails: React.FC = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string>('');
  const { id } = useParams<string>();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        setError('Authentication error. Please log in.');
        return;
      }

      try {
        const response = await axios.get(`https://be.ullegadda-srikanta.workers.dev/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setError('Failed to fetch post details. Please try again later.');
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (error) return <div className="text-center text-lg font-semibold text-red-500">{error}</div>;
  if (!post) return <div className="text-center text-lg font-semibold">Loading...</div>;

  return (
    <div>
      <Appbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{post.title}</h1>
        <p className="text-gray-600 mb-6">Author: {post.author?.name || 'Anonymous'}</p>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Post Content</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 px-4 py-5">
                {post.content}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
