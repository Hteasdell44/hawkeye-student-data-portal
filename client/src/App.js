import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './css/App.css';

import Nav from "./components/Reused/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ParentOptions from "./pages/ParentOptions";
import StudentBehavior from "./pages/StudentBehavior";
import ClassCatalog from "./pages/ClassCatalog";
import AssignmentList from "./pages/AssignmentList";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherSignup from "./pages/TeacherSignup";
import ParentHome from "./pages/ParentHome";
import TeacherHome from "./pages/TeacherHome";
import TeacherClass from "./pages/TeacherClass";
import TeacherOptions from "./pages/TeacherOptions";
import StudentAssignmentList from "./pages/StudentAssignmentList";
import TeacherStudentBehavior from "./pages/TeacherStudentBehavior";
import TeacherIndividualAssignment from "./pages/TeacherIndividualAssignment";
import Footer from "./components/Reused/Footer";

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

                        <Route path="/home" element={<ParentHome />} />    

                        <Route path="/student/:id" element={<ParentOptions />} /> 

                        <Route path="/student/:id/behavior" element={<StudentBehavior />} />

                        <Route path="/student/:id/classes" element={<ClassCatalog />} />                  

                        <Route path="/student/:id/classes/:classId" element={<AssignmentList/>} />                  

                        <Route path="/teacher/login" element={<TeacherLogin />} />                  

                        <Route path="/teacher/signup" element={<TeacherSignup />} />

                        <Route path="/teacher/home" element={<TeacherHome />} />

                        <Route path="/teacher/:classId" element={<TeacherClass />} />

                        <Route path="/teacher/:classId/:studentId" element={<TeacherOptions/>} />

                        <Route path="/teacher/:classId/:studentId/assignments" element={<StudentAssignmentList /> } />

                        <Route path="/teacher/:classId/:studentId/behavior" element={<TeacherStudentBehavior/>} />

                        <Route path="/teacher/:classId/:studentId/assignments/:assignmentId" element={<TeacherIndividualAssignment/>} />

                    </Routes>

                </Router>

            <Footer />

        </QueryClientProvider>

    );
};


export default App;