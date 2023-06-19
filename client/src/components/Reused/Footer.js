import Favicon from "../../utils/img/hawk-eye-favicon.png";
import AuthService from "../../utils/auth.js";
import { useState } from 'react';
import axios from "axios";

export default function Footer() {

    const [userType, setUserType] = useState("");

    const determineUserType = async () => {

        const userType = await axios.post('/determine-user-type', {
            email: AuthService.getProfile().data.email,
        });

        setUserType(userType.data);
    }

    if (AuthService.loggedIn()) {

        determineUserType();

        if (userType == "teacher") {

            return(

                <footer className="sticky w-full h-auto bg-black absolute bottom-0 border-4 border-black md:hidden">
        
                    <div className="flex flex-row">
        
                        <a href='/teacher/home'className="absolute bottom-2 p-4 bg-gold rounded-xl text-lg font-bold">Home</a>
                        <img src={Favicon} className="w-auto block m-auto"/>
                        <button className="absolute right-0 bottom-2 p-4 bg-gold rounded-xl text-lg font-bold" onClick={() => AuthService.logout()}>Logout</button>
        
                    </div>
        
                </footer>

            );
        }

    return(

        <footer className="sticky w-full h-auto bg-black absolute bottom-0 border-4 border-black md:hidden">

            <div className="flex flex-row">

                <a href='/home'className="absolute bottom-2 p-4 bg-gold rounded-xl text-lg font-bold">Home</a>
                <img src={Favicon} className="w-auto block m-auto"/>
                <button className="absolute right-0 bottom-2 p-4 bg-gold rounded-xl text-lg font-bold" onClick={() => AuthService.logout()}>Logout</button>

            </div>

        </footer>

    );
    
    }
}