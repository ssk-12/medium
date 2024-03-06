import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export function Blogs() {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [error, setError] = useState<string>('');
    const { id } = useParams<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                setError('Authentication error. Please log in.');
                navigate("/signin");
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
                if (axios.isAxiosError(error)) {
                    console.error('Error fetching post details:', error?.response?.data || error.message);
                    setError(error?.response?.data?.error || 'Failed to fetch post details. Please try again later.');
                } else {
                    console.error('Error fetching post details:', error);
                    setError('Failed to fetch post details. Please try again later.');
                }
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (error) return <><div className="text-center text-lg font-semibold text-red-500">{error}</div></>;
    if (!post) {
        return (
            <>
                <Appbar />
                <div className="flex items-center justify-center h-screen font-bold ">
                    <div>Loading...</div>
                </div>
            </>
        );
    };

    return (
        <div className="m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2 lg:col-span-2">
                    <div className="flex flex-col gap-2">
                        <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold max-w-lg">
                            {post.title}
                        </div>
                        <div className="text-sm md:text-md lg:text-md text-slate-800">
                            {post.content}
                        </div>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-9">
                    <div>Author</div>
                    <div className="flex items-center gap-2 m-4">
                        <div className="profile-icon bg-zinc-400 rounded-full h-6 w-6 flex items-center justify-center text-black text-sm font-light">
                            {post.author?.name?.[0] || 'A'}
                        </div>
                        <div className="flex flex-col">
                            <div>Author: {post.author?.name || 'Anonymous'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
