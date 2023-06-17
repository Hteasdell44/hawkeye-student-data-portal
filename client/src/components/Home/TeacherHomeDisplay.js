import AuthService from "../../utils/auth";
import { useState } from "react";
import axios from "axios";
import { useQuery } from 'react-query';

export default function TeacherHomeDisplay() {

    const currentTeacher = AuthService.getProfile().data;

    const getCurrentTeachersClasses = async () => {

        const currentTeachersClasses = await axios.post('/teacher/classes', {
            teacherEmail: currentTeacher.email,
        });

        return currentTeachersClasses.data;
    }

    const { data } = useQuery('getCurrentTeachersClasses', getCurrentTeachersClasses);

    return(

        <div id="login-container" className="flex flex-col h-screen items-center ">

            <h1 className="mt-40 text-center text-4xl font-bold mb-8">Welcome, {currentTeacher.firstName} {currentTeacher.lastName}!</h1>

            {data && data.length !== 0 && (<h2 className="text-center text-3xl font-bold mb-8">View Your Classes:</h2>)}

            {data && data.length == 0 && (<h2 className="text-center text-3xl mb-8">You Dont Have Any Classes Yet, Please Contact Admininistration.</h2>)}

            {data && data.map((item) => (

                <a href={`/teacher/${item.id}`} className="border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105">

                    <div key={item.id}>

                        <div className="">
                    
                            <h1>{item.name} - Section {item.id}</h1>
                    
                        </div>

                    </div>

                </a>
            ))}

        </div>
        
    );
}