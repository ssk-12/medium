import React from 'react';
import { Signup } from "./Signup";
import { Signin } from "./Signin"; // Make sure you have this import
import { Quote } from './Quote';

export function Auth(props:any) {
    return (
        <div className="lg:grid grid-cols-2">
            <div>
                {props.auth === "signup" ? <Signup /> : <Signin />}
            </div>
            <div>
                <Quote/>
            </div>
        </div>
    );
}
