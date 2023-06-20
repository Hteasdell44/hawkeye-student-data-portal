import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from 'react';

export default function TeacherStudentBehaviorDisplay() {

    const { classId, studentId } = useParams();

    const [showTextBox, setShowTextBox] = useState("false");
    const [formState, setFormState] = useState({ newBehaviorReport: ""});

    const getCurrentStudent = async () => {

        const currentStudent = await axios.get(`/current-student/${studentId}`);

        return currentStudent.data;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleUpdateSubmit = async (event) => {

        event.preventDefault();

        const updatedStudent = await axios.patch('/teacher/update-behavior-report', {
            studentId: studentId,
            newBehaviorReport: formState.newBehaviorReport
        });

        window.location.reload();
    };

    const { data: studentData } = useQuery('getCurrentStudent', getCurrentStudent);

    return(

        <div className="flex flex-col min-h-screen items-center">

            {studentData && (<h1 className="mt-40 text-center text-4xl mb-6 font-bold"> {studentData.firstName}'s Behavior Report:</h1>)}

            {studentData && (<p className="w-4/5 border-2 border-black p-4 rounded-xl shadow-xl text-center xl:w-1/4">{studentData.firstName} {studentData.behaviorReport}</p>)}
            
            {showTextBox && (<button className="w-4/5 border-2 border-black bg-gold p-5 rounded-xl shadow-xl mt-10 font-bold hover:scale-105 xl:w-1/4" onClick={() => setShowTextBox(!showTextBox)}>Update Behavior Report</button>)}

            {!showTextBox && (<button className="w-4/5 border-2 border-black bg-gold p-5 rounded-xl shadow-xl mt-10 font-bold hover:scale-105 xl:w-1/4" onClick={() => setShowTextBox(!showTextBox)}>Cancel Update</button>)}

            {!showTextBox && (
            
            <form className="border-2 border-black p-4 rounded-xl shadow-xl flex flex-col w-4/5 font-bold text-center mt-12 xl:w-1/4" onSubmit={handleUpdateSubmit}>

                <h2 className="text-2xl mb-1">{studentData.firstName}...</h2>

                <textarea className="w-full p-5 border-2 border-black rounded-xl shadow-xl" name="newBehaviorReport" placeholder={`is a pleasure to teach!`} onChange={handleChange}/>

                <button className="border-2 border-black bg-gold p-5 rounded-xl shadow-xl mt-5 hover:scale-105">Save New Report</button>

            </form>)}
        
        </div>
    );
}