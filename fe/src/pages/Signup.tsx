import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://be.ullegadda-srikanta.workers.dev/api/v1/user/signup', {
                name: username,
                email,
                password
            });

            const { jwt, message } = response.data;

            console.log(message);

            if (jwt) {
                localStorage.setItem('token', jwt);
                setMessage("login success")
                navigate('/dashboard');
            } else {
                if(message){
                    setMessage(message);
                }
                else{
                    setMessage("Couldn't Sign up");
                }
                
            }

        } catch (error:any) {
            console.error('Signup error:', error.response?.data || error.message);
            setMessage(error.message || "An unexpected error occurred");
        }
    };

    return (
        <div className="h-screen w-full m-auto bg-slate-100 flex flex-col justify-center items-center">
            <div className="text-3xl font-extrabold">
                Signup an account
            </div>
            <div className="mt-1 text-slate-500 font-medium">
                have an account?{" "}
                <Link to="/signin" className="underline text-zinc-500 hover:text-zinc-700">Sign in</Link>
            </div>
            <form className="w-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="mt-4">
                    <div className="font-medium">Username</div>
                    <div className="mt-1">
                        <input className="rounded-sm p-1 border-zinc-500 w-[350px]" type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className="mt-4">
                    <div className="font-medium">Email</div>
                    <div className="mt-1">
                        <input className="rounded-sm p-1 border-zinc-500 w-[350px]" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="mt-4">
                    <div className="font-medium">Password</div>
                    <div className="mt-1">
                        <input className="rounded-sm p-1 border-zinc-500 w-[350px]" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {message && (
                    <div className="mt-3 text-slate-500">
                        {message}
                    </div>
                )}
                <div className="mt-6">
                    <button className="bg-black text-white rounded-md p-1 w-[350px]" type="submit">Sign Up</button>
                </div>
                
            </form>
        </div>
    );
}
