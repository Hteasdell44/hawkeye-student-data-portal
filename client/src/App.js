import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Nav from "./components/Reused/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

document.title = "Hawkeye Student Data Portal";

const App = () => {

    return(

        <div>

            <Nav />

                <Router>

                    <Routes>

                        <Route path="/" element={<Login />} />

                        <Route path="/signup" element={<Signup />} />

                        <Route path="/profile" element={<Profile />} />                   

                    </Routes>

                </Router>

        </div>
    );
};


export default App;