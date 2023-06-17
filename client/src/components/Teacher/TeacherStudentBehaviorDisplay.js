import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from 'react';

export default function TeacherStudentBehaviorDisplay() {

    const { classId, studentId } = useParams();

    const [showTextBox, setShowTextBox] = useState("false");
    const [formState, setFormState] = useState({ newBehaviorReport: ""});

    const getCurrentStudent = async () => {

        const currentStudent = await axios.post('/current-student',{
            studentId: studentId
        });

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

        const updatedStudent = await axios.post('/teacher/update-behavior-report', {
            studentId: studentId,
            newBehaviorReport: formState.newBehaviorReport
        });

        window.location.reload();
    };

    const { data: studentData } = useQuery('getCurrentStudent', getCurrentStudent);

    return(

        <div className="flex flex-col h-screen items-center ">

            {studentData && (<h1 className="mt-40 text-center text-4xl mb-28 font-bold"> {studentData.firstName}'s Behavior Report:</h1>)}

            {studentData && (<p>{studentData.firstName} {studentData.behaviorReport}</p>)}
            
            {showTextBox && (<button className="bg-gold p-5 rounded-xl shadow-xl mt-10" onClick={() => setShowTextBox(!showTextBox)}>Update Behavior Report</button>)}

            {!showTextBox && (<button className="bg-gold p-5 rounded-xl shadow-xl mt-10" onClick={() => setShowTextBox(!showTextBox)}>Cancel Update</button>)}

            {!showTextBox && (
            
            <form className="flex flex-col w-2/5" onSubmit={handleUpdateSubmit}>

                <textarea className="w-full p-5 mt-20 border-2 border-black rounded-xl shadow-xl" name="newBehaviorReport" placeholder={`${studentData.firstName}...`} onChange={handleChange}/>

                <button className="bg-gold p-5 rounded-xl shadow-xl mt-5">Save New Report</button>

            </form>)}
        
        </div>
    );
}