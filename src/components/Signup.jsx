import React, { useEffect, useState } from 'react'
import { Input, Button, Logo } from "./index"
import authService from '../appwrite/auth'
import { login } from '../store/authSlicer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'


const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const [error, setError] = useState("")

    const signup = async (data) => {
        setError("")

        try {
            const userData = await authService.createAccount(data);
            if(userData?.name == "AppwriteException"){
                alert(userData.message);
            }
            else if (userData) {
                const userData = await authService.getCurrentUser();
                dispatch(login(userData))
                navigate("/")
            }
            else {
                alert("Failed to Signup.",userData)
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-300 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[150px]">
                        <Logo  />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signup)}>
                    <div className="space-y-6">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                minLength: {
                                    value: 4,
                                    message: "Name must be minimum 4 Characters"
                                }
                            })}
                        />
                        {errors.name && <div className='text-yellow-600 text-center'>{errors.name.message}</div>}

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && <div className='text-yellow-600 text-center'>{errors.email.message}</div>}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Password must be minimum 8 Characters"
                                }
                            })}
                        />
                        {errors.password && <div className='text-yellow-600 text-center'>{errors.password.message}</div>}

                        <Button type="submit" disable={isSubmitting} className="w-full cursor-pointer">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signup
