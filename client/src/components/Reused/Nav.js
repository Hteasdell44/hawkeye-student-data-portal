import Logo from "../../utils/img/hawk-eye-logo.png";
import AuthService from "../../utils/auth.js";

import { useEffect, useRef } from "react";

export default function Nav() {

    const logoutUser = () => {

        AuthService.logout();
    }

    const handleClick = () => {

        if (AuthService.loggedIn()) {

            window.location.assign('/profile');
    
        } else { window.location.assign('/login')}
    }

    if (AuthService.loggedIn()) {
        
        return (

            <header>
    
                    <nav class="fixed flex w-screen h-auto items-center justify-between flex-wrap bg-black p-3">
    
                            <a class=" sm:w-2/5 md:w-3/5 lg:w-2/5 xl:w-1/5 block mx-auto" href="/">
                                <img id="logo" src={Logo} class="block" alt="Responsive image" />
                            </a>

                            <button className="text-black bg-gold p-2" onClick={logoutUser}>Log Out</button>
                            
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