import { Link } from "react-router-dom";

export function Signin(){
    return <div className="h-screen w-full m-auto bg-slate-100 flex flex-col justify-center items-center">
        <div className="text-3xl font-extrabold">
            Create an account
        </div>
        <div className="mt-1 text-slate-500 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
            <div className="mt-4">
                <div className="font-medium">Username</div>
                <div className="mt-1">
                    <input className="rounded-sm p-1 border-zinc-500 w-[350px]" type="text" placeholder="Enter your username"/>
                </div>
            </div>
            <div className="mt-4">
                <div className="font-medium">Email</div>
                <div className="mt-1">
                    <input className="rounded-sm p-1 border-zinc-500 w-[350px]" type="email" placeholder="Enter your email"/>
                </div>
            </div>
            <div className="mt-4">
                <div className="font-medium">password</div>
                <div className="mt-1">
                    <input className="rounded-sm p-1 border-zinc-500 w-[350px]" type="password" placeholder="Enter your password"/>
                </div>
            </div>
        </div>
        <div className="mt-6">
            <button className="bg-black text-white rounded-md p-1 w-[350px]">Sign Up</button>
        </div>
    </div>
}
