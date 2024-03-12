import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


type BlogPost = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    author: {
        name: string | null;
    };
};

export const Userblogs: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    navigate("/signin");
                    return;
                }

                const response = await axios.post('https://be.ullegadda-srikanta.workers.dev/api/v1/blog/userblogs',{
                    published : true
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPosts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return (
            <>
                {/* <Appbar /> */}
                <div className="flex items-center justify-center h-screen font-bold ">
                    <div>Loading...</div>
                </div>
            </>
        );
    }


    if (posts.length === 0) {
        return <>

            {/* <Appbar /> */}
            <div className=" flex items-center justify-center font-bold" style={{ height: `calc(100vh - 104px)` }}>
                No Posts Available
            </div>

        </>
    }

    return (
        <div>
            <div>
                {posts.map((post) => (
                    <div key={post.id} className="m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-lg border-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="md:col-span-2 lg:col-span-2">
                                <div className="flex flex-col gap-2">
                                    <Link to={`blog/${post.id}`} className="text-2xl md:text-3xl lg:text-4xl font-extrabold max-w-lg">
                                        {post.title}
                                    </Link>
                                    <div className="text-sm md:text-md lg:text-md text-slate-800">
                                        {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                                    </div>
                                    <div>
                                        estimated read time : {post.content.length / 200 < 1 ? "less than a minute" : `${(post.content.length / 200).toFixed(1)} minute(s)`}
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
                                        <div>
                                            status : Draft
                                        </div>
                                        {/* <div>
                                            <button onClick={async () => {
                                                const token = localStorage.getItem('token'); // Ensure you get the token

                                                // Check if token exists
                                                if (!token) {
                                                    console.error('No token found');
                                                    navigate("/signin");
                                                    return;
                                                }

                                                try {
                                                    await axios.put("https://be.ullegadda-srikanta.workers.dev/api/v1/blog/publishblog", {
                                                        id: post.id
                                                    }, {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`,
                                                        },
                                                    });
                                                    navigate('/dashboard');
                                                } catch (error) {
                                                    console.error('Error publishing the post:', error);
                                                }
                                            }} className='rounded-full bg-slate-500 px-2 py-1 mt-3 text-xs font-bold w-[80%]'>Publish</button>

                                        </div> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};
