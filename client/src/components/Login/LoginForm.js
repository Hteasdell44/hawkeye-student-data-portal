import React, { useState } from "react";
import axios from 'axios';
import AuthService from "../../utils/auth.js";

export default function LoginForm() {

    if (AuthService.loggedIn()) {
        window.location.assign("/home");
    }

    const [formState, setFormState] = useState({ loginEmail: "", loginPassword: "" });
    const [loginError, setLoginError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleLoginSubmit = async (event) => {

        event.preventDefault();

        const verifiedParent = await axios.post('/', {
            email: formState.loginEmail.toLowerCase(),
            password: formState.loginPassword,
        });

        console.log(verifiedParent);

        if (verifiedParent) {

            AuthService.login(JSON.stringify(verifiedParent));
            
        } else {

            setLoginError("Error logging in...");

        }
    };
    
    return(

        <div id="login-container" className="flex flex-col h-screen items-center justify-center">

            <form class="border-black border-4 rounded-lg w-auto xl:w-3/5 p-10 mx-auto mb-5 shadow-lg" onSubmit={handleLoginSubmit}>

                <h1 className="text-center text-4xl mb-8">Login</h1>

                <div class="md:flex md:items-center mb-6">

                    <div class="md:w-1/5">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">Email</label>
                    </div>

                    <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="email" name="loginEmail" placeholder="Example@email.com" onChange={handleChange} />
                    </div>
                </div>

                <div class="md:flex md:items-center mb-6">

                    <div class="md:w-1/5">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">Password</label>
                    </div>

                    <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" type="password" name="loginPassword" placeholder="******************" onChange={handleChange} />
                    </div>

                </div>

                <button class="shadow bg-gold hover:bg-gold focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded w-4/5 block mx-auto bg-gold" type="submit">
                    Login
                </button>



            </form>

            <div class="text-center">
                    <p>Don't Have An Account? <a href="/signup" className="text-gold underline">Sign Up Now</a></p>
            </div>

            {/* <form onSubmit={handleLoginSubmit}>

                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Email</label>
                    <input type="email" name="loginEmail" id="form2Example1" class="form-control" onChange={handleChange} />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">Password</label>
                    <input type="password" name="loginPassword" id="form2Example2" class="form-control" onChange={handleChange} />
                </div>

                <button type="submit" class="btn btn-primary btn-block mb-4">Sign In</button>

                <div class="text-center">
                    <p>Not a Member? <a href="/signup">Register</a></p>
                    {loginError && (<div className="p-3 text-red-600">{loginError}</div>)}
                </div>

            </form> */}

        </div>

    );
};