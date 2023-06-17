import React, { useState } from "react";
import AuthService from "../../utils/auth";
import axios from 'axios';

export default function SignupForm(){

    if (AuthService.loggedIn()) {

        window.location.assign("/home");
    }

    const [formState, setFormState] = useState({ firstName: "", lastName: "", email: "", password: "", passwordConfirm: "" });
    const [signupError, setSignupError] = useState(""); 
    
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSignupSubmit = async (event) => {

        event.preventDefault();
        
        if (formState.password !== formState.passwordConfirm) {

            setSignupError("Passwords do not match!");
            return;
        }

        const newParent = await axios.post('/signup', {
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email.toLowerCase(),
            password: formState.password,
        });

        if (newParent) {

            AuthService.login(JSON.stringify(newParent));
            window.location.assign('/home');
            
        } else {

            setSignupError("Error creating an account...");

        }

    }

    return(

        <div id="login-container" className="flex flex-col h-screen items-center justify-center">

            <form class="border-black border-4 rounded-lg w-auto xl:w-3/5 p-10 mx-auto mb-5 mt-20 shadow-lg" onSubmit={handleSignupSubmit}>

                <h1 className="text-center text-4xl mb-8">Sign Up</h1>

            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/5">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    First Name
                </label>
                </div>
                <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="text" name="firstName" placeholder="John" onChange={handleChange}/>
                </div>
            </div>

            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/5">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Last Name
                </label>
                </div>
                <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="text" name="lastName" placeholder="Appleseed" onChange={handleChange} />
                </div>
            </div>

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
                    Confirm Password
                </label>
                </div>
                <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="password" name="passwordConfirm" placeholder="******************" onChange={handleChange} />
                </div>
            </div>

            <button class="shadow bg-gold text-black hover:bg-gold focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded w-4/5 block mx-auto" type="submit">
                    Create Account
                </button>

            </form>

            <div class="text-center">
                    <p>Already Have An Account? <a href="/" className="text-gold underline">Login Now</a></p>
                    <p className="mt-5">Are You A Teacher? <a href="/teacher/login" className="text-gold underline">Login Now</a></p>

                    {signupError && (<div className="p-3 text-red-600">{signupError}</div>)}
            </div>       

        </div>
    );


};