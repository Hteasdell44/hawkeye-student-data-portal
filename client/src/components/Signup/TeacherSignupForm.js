import React, { useState } from "react";
import AuthService from "../../utils/auth";
import axios from 'axios';

export default function TeacherSignupForm(){

    if (AuthService.loggedIn()) {

        window.location.assign("/teacher/home");
    }
    const [showPasswordUpdateForm, setShowPasswordUpdateForm] = useState(false);
    const [otpFormState, setotpFormState] = useState({ email: "", oneTimePassword: "" });

    const [formState, setFormState] = useState({  email: "", password: "", passwordConfirm: "" });
    const [signupError, setSignupError] = useState(""); 
    
    const handleotpChange = (event) => {

        const { name, value } = event.target;

        setotpFormState({
            ...otpFormState,
            [name]: value,
        });
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleotpSubmit = async (event) => {

        event.preventDefault();

        setSignupError("");

        const verifiedTeacher = await axios.post('/teacher/verify-otp', {
            email: otpFormState.email.toLowerCase(),
            oneTimePassword: otpFormState.oneTimePassword,
        });

        if (verifiedTeacher.data) {

            setShowPasswordUpdateForm(true);
            
        } else {

            setSignupError("Your email or OTP was incorrect...");

        }

    }

    const handleSignupSubmit = async (event) => {

        event.preventDefault();
        
        if (formState.password !== formState.passwordConfirm) {

            setSignupError("Passwords do not match!");
            return;
        }

        const updatedTeacher = await axios.post('/teacher/update-password', {
            email: formState.email.toLowerCase(),
            password: formState.password,
        });

        if (typeof(updatedTeacher.data) == "string") {

            setSignupError(updatedTeacher.data);
            return;
            
        } else if (updatedTeacher.data) {

            AuthService.login(JSON.stringify(updatedTeacher.data));
            window.location.assign('/teacher/home')
            return;
        } 

        setSignupError("There was an error updating your password...")

    }

    return(

        <div id="login-container" className="flex flex-col h-screen items-center justify-center">

            {!showPasswordUpdateForm && (

                    <form class="border-black border-4 rounded-lg w-auto xl:w-3/5 p-10 mx-auto mb-5 mt-20 shadow-lg" onSubmit={handleotpSubmit}>

                        <h1 className="text-center text-4xl mb-8">Teacher Verification</h1>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/5">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Email
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="email" name="email" placeholder="Example@email.com" onChange={handleotpChange} />
                        </div>
                    </div>


                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/5">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                            One Time Password
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="password" name="oneTimePassword" placeholder="******************" onChange={handleotpChange} />
                        </div>
                    </div>

                    <button class="shadow bg-gold text-black hover:bg-gold focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded w-4/5 block mx-auto" type="submit">
                            Verify
                        </button>

                    </form>)}

            {showPasswordUpdateForm && (

                    <form class="border-black border-4 rounded-lg w-auto xl:w-3/5 p-10 mx-auto mb-5 mt-20 shadow-lg" onSubmit={handleSignupSubmit}>

                        <h1 className="text-center text-4xl mb-8">Teacher Sign Up</h1>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/5">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Email
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="email" name="email" placeholder="Example@email.com" onChange={handleChange} />
                        </div>
                    </div>


                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/5">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                            Password
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="password" name="password" placeholder="******************" onChange={handleChange} />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/5">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                            Password Confirm
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="password" name="passwordConfirm" placeholder="******************" onChange={handleChange} />
                        </div>
                    </div>

                    <button class="shadow bg-gold text-black hover:bg-gold focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded w-4/5 block mx-auto" type="submit">
                            Create Account
                        </button>

                    </form>)}

            <div class="text-center">
                    <p>Already Verified Your Account? <a href="/teacher/login" className="text-gold underline">Login Now</a></p>
                    {signupError && (<div className="p-3 text-red-600">{signupError}</div>)}
            </div> 

            <div class="text-center">
                    
            </div>      

        </div>
    );


};