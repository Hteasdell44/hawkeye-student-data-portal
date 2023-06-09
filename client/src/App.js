import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Nav from "./components/Reused/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ParentOptions from "./pages/ParentOptions";

document.title = "Hawkeye Student Data Portal";

const queryClient = new QueryClient();


const App = () => {

    return(

        <QueryClientProvider client={queryClient}>
            <Nav />

                <Router>

                    <Routes>

                        <Route path="/" element={<Login />} />

                        <Route path="/signup" element={<Signup />} />

                        <Route path="/profile" element={<Profile />} />

                        <Route path="/home" element={<Home />} />    

                        <Route path="/student/:id" element={<ParentOptions />} />                   

                    </Routes>

                </Router>

        </QueryClientProvider>

    );
};


export default App;