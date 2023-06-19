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

        console.log(verifiedParent.data);

        if (AuthService.isJWT(verifiedParent.data)) {

            AuthService.login(JSON.stringify(verifiedParent.data));
            window.location.assign('/home');
            return;
            
        } else if (typeof(JSON.stringify(verifiedParent.data)) == "string"){

            setLoginError(verifiedParent.data);
            return;
        }

        setLoginError("Error logging in...");
    };
    
    return(

        <div id="login-container" className="flex flex-col h-screen items-center justify-center">

            <form class="border-black border-4 font-bold rounded-xl shadow-xl w-auto xl:w-3/5 p-10 mx-auto mb-5 shadow-lg" onSubmit={handleLoginSubmit}>

                <h1 className="text-center text-4xl mb-8">Parent Login</h1>

                <div class="md:flex md:items-center mb-6">

                    <div class="md:w-1/5">
                        <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">Email</label>
                    </div>

                    <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-black rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gold" type="email" name="loginEmail" placeholder="Example@email.com" onChange={handleChange} />
                    </div>
                </div>

                <div class="md:flex md:items-center mb-6">

                    <div class="md:w-1/5">
                        <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">Password</label>
                    </div>

                    <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-black rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gold" type="password" name="loginPassword" placeholder="******************" onChange={handleChange} />
                    </div>

                </div>

                <button class="text-xl border-2 border-black shadow-xl bg-gold hover:bg-gold focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded-xl w-4/5 block mx-auto bg-gold hover:scale-105" type="submit">
                    Login
                </button>



            </form>

            <div class="text-center font-bold">
                    <p>Don't Have An Account? <a href="/signup" className="text-gold underline">Sign Up Now</a></p>
            </div>


            <div class="text-center mt-5 font-bold ">
                    <p>Are You A Teacher? <a href="/teacher/login" className="text-gold underline">Login Here</a></p>
                    {loginError && (<div className="p-3 text-red-600">{loginError}</div>)}
            </div>

        </div>

    );
};