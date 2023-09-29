import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase-config/firebase.config";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email, pass, accepted)
        // reset error message
        setRegisterError('')
        setRegisterSuccess('');
        if (pass.length < 6) {
            setRegisterError('Password should be 6 character')
            return
        }
        else if (!/[A-Z]/.test(pass)) {
            setRegisterError('Your password should have at last one upper case letter ')
            return
        }
        else if (!accepted) {
            setRegisterError('Please accept our terms and condition')
            return
        }
        // create User  
        createUserWithEmailAndPassword(auth, email, pass)
            .then(result => {
                console.log(result.user)
                setRegisterSuccess('User create successfully')

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => console.log('profile update'))
                    .catch()

                // send verification email
                sendEmailVerification(result.user)
                    .then(() => {
                    alert('Please check your email and verify your account')
                    return
                })
            })
            .catch (error => {
                console.error(error);
                setRegisterError(error.message)
            })
    }
    
    return (
        <div >
            <div className=" bg-slate-400 w-1/2 mx-auto mt-4 p-5 space-y-2 text-center">
                <h2 className="text-4xl text-white font-semibold my-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" name="name" placeholder="Enter your name"  className=" mb-4 w-2/3 py-2 px-4  rounded-lg" required/>
                    <br />
                    <input type="email" name="email" placeholder="Enter your email"  className=" mb-4 w-2/3 py-2 px-4  rounded-lg" required/>
                    <br />
                    <div className="relative">
                        <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Your password"
                        className=" w-2/3 py-2 px-4  
                        rounded-lg" required />
                        <span className="absolute -ml-8 my-3 text-xl" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <AiFillEyeInvisible/>: <AiFillEye />
                            }
                        </span>
                    </div>
                    <br />
                    <div className="mb-2 text-left ml-28">
                        <input type="checkbox" name="terms" id="terms"/>
                        <label className="ml-2" htmlFor="terms">Accept our terms and condition</label>
                    </div>
                    <br />
                    <input type="submit" value="Register" className="btn btn-secondary  mb-3 w-2/3 py-2 px-4 " />
                    
                </form>
                <div>
                    {
                        registerError && <p className="text-red-600">{registerError }</p>
                    }
                    {
                        registerSuccess && <p className="text-green-600">{ registerSuccess }</p>
                    }
                </div>
                <p>Already register, please <Link className=" text-blue-600" to = '/login'> Login now</Link> </p>
           </div>
        </div>
    );
};

export default Register;