import { Signup } from "./Signup";
import { Signin } from "./Signin"; 
import { Quote } from './Quote';

export function Auth(props:any) {
    return (
        <div className="lg:grid grid-cols-2">
            <div>
                {props.auth === "signup" ? <Signup /> : <Signin />}
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    );
}
