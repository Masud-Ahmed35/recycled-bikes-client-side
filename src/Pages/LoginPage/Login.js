import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAuthToken } from '../../Api/auth';
import SmallSpinner from '../../Components/SmallSpinner';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn, resetPassword, loading, setLoading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    // const [resetEmail, setResetEmail] = useState('');

    const googleProvider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const googleUser = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    image: result?.user?.photoURL,
                    role: 'buyer'
                }
                setAuthToken(googleUser);
                if (result.acknowledged) {
                    toast.success("Login Successful With Google");
                    setLoading(false);
                    navigate(from, { replace: true })
                }
            })
            .catch(error => {
                toast.error(error.message);
                setLoading(false);
            })
    }

    const handleSignIn = data => {
        signIn(data.email, data.password)
            .then(result => {
                toast.success('Login Successful');
                setAuthToken({ email: result.user.email })
                setLoading(false);
                navigate(from, { replace: true })
            })
            .catch(error => {
                toast.error(error.message);
                setLoading(false);
            })
    }

    // const handleResetPassword = (data) => {
    //     console.log(resetEmail);
    //     if (resetEmail) {
    //         resetPassword(resetEmail)
    //             .then(result => {
    //                 toast.success('Please check your inbox for reset password');
    //                 setLoading(false);
    //             })
    //             .catch(error => {
    //                 toast.error(error.message);
    //                 setLoading(false);
    //                 setResetEmail('');
    //             })
    //     }
    //     else {
    //         return toast.warning('Please provide an email for reset password');
    //     }
    // }

    return (
        <section>
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form onSubmit={handleSubmit(handleSignIn)} className="w-full max-w-md">
                    <h1 className="text-3xl mb-7 text-center font-extrabold italic text-gray-800">Login</h1>

                    <label className='' htmlFor="">Email</label>
                    <div className="relative flex items-center mt-2">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <input type="email"
                            // onBlur={e => setResetEmail(e.target.email)}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="example@email.com"
                            {...register("email", {
                                required: 'Email Address is required'
                            })}
                            aria-invalid={errors?.email ? 'true' : 'false'}
                        />
                    </div>
                    <div className="mb-4 text-right text-sm">{errors?.email && <p role='alert' className='text-red-600'>{errors?.email?.message}</p>}</div>
                    <label className='' htmlFor="">Password</label>
                    <div className="relative flex items-center mt-2">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input type="password"
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="********"
                            {...register("password", {
                                required: 'Please give your password',
                            })}
                            aria-invalid={errors?.password ? 'true' : 'false'}
                        />
                    </div>
                    <p className='text-right text-xs mt-1 hover:underline'><Link>Forgot Your Password?</Link></p>
                    <div className="text-right text-sm mt-1">{errors?.password && <p role='alert' className='text-red-600'>{errors?.password?.message}</p>}</div>
                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            {
                                loading ? <div className='flex justify-center'><SmallSpinner /></div> : 'LogIn'
                            }
                        </button>
                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b md:w-1/4"></span>
                            <p className="text-xs text-gray-500 uppercase">or sign in</p>
                            <span className="w-1/5 border-b md:w-1/4"></span>
                        </div>
                        <Link onClick={handleLoginWithGoogle} className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50">
                            <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                            </svg>
                            <span className="mx-2">
                                Sign in with Google
                            </span>
                        </Link>
                        <div className="mt-6 text-center ">
                            <Link to='/signup' className="text-sm text-blue-500 hover:underline">
                                Don't have an account yet? Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;