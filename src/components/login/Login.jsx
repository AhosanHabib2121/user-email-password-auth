import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase-config/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [registerError, setRegisterError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState('')
    const emailRef = useRef(null)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        // reset error message
        setRegisterError('')
        setRegisterSuccess('');

        // add validation
        
        // sign in work
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if (result.user.emailVerified) {
                    setRegisterSuccess('User login successfully')
                }
                else {
                    alert('Please verify your email address')
                }
            })
            .catch(error => {
                setRegisterError(error.message);
            })
    }
    // forgot password
    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please provide an email')
            return
        }
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            alert('please write a valid email')
            return
        }
        // send validation email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your email');
            })
            .catch(error => {
                alert(error.message);
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="email"
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" onClick={handleForgotPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>
                            {
                                registerError && <p className="text-red-600">{registerError }</p>
                            }
                            {
                                registerSuccess && <p className="text-green-600">{ registerSuccess }</p>
                            }
                        </div>
                        <p>First of all <Link className=" text-blue-600" to = '/register'>Registration</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;