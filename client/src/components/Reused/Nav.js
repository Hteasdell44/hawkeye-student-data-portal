import Logo from "../../utils/img/hawk-eye-logo.png";
import AuthService from "../../utils/auth.js";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Nav() {

    const [userType, setUserType] = useState("");

    const logoutUser = () => {

        AuthService.logout();
    }

    const determineUserType = async () => {

        const userType = await axios.post('/determine-user-type', {
            email: AuthService.getProfile().data.email,
        });

        setUserType(userType.data);
    }

    if (AuthService.loggedIn()) {

        determineUserType();

        if (userType == "teacher") {

            return (

                <header>
        
                        <nav class="fixed flex w-screen h-auto items-center justify-between flex-wrap bg-black p-3">
        
                                <button className="absolute left-5 text-black bg-gold p-2 rounded-xl hover:scale-105" onClick={() => window.location.assign('/teacher/home')}>Home</button>
    
                                <a class=" sm:w-2/5 md:w-3/5 lg:w-2/5 xl:w-1/5 block mx-auto" href="/teacher/home">
                                    <img id="logo" src={Logo} class="block" alt="Responsive image" />
                                </a>
                                
                                <button className="absolute right-5 text-black bg-gold p-2 rounded-xl hover:scale-105" onClick={logoutUser}>Log Out</button>
                                
                        </nav>
        
                </header>
        
            );
        }

        return (

            <header>
    
                    <nav class="fixed flex w-screen h-auto items-center justify-between flex-wrap bg-black p-3">
    
                            <button className="absolute left-5 text-black bg-gold p-2 rounded-xl hover:scale-105" onClick={() => window.location.assign('/home')}>Home</button>

                            <a class=" sm:w-2/5 md:w-3/5 lg:w-2/5 xl:w-1/5 block mx-auto" href="/">
                                <img id="logo" src={Logo} class="block" alt="Responsive image" />
                            </a>
                            
                            <button className="absolute right-5 text-black bg-gold p-2 rounded-xl hover:scale-105" onClick={logoutUser}>Log Out</button>
                            
                    </nav>
    
            </header>
    
        );
    }

    return (

        <header>

                <nav class="fixed w-screen h-auto items-center justify-between flex-wrap bg-black p-3">

                        <a class=" sm:w-2/5 md:w-3/5 lg:w-2/5 xl:w-1/5 block mx-auto" href="/">
                            <img id="logo" src={Logo} class="block" alt="Responsive image" />
                        </a>
                        
                </nav>

        </header>

    );

}