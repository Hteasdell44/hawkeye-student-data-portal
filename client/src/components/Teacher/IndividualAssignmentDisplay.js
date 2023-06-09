import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from 'react';

export default function IndividualAssignmentDisplay() {

    const { classId, studentId, assignmentId } = useParams();

    const [showNameUpdateBox, setShowNameUpdateBox] = useState("false");
    const [showGradeUpdateBox, setShowGradeUpdateBox] = useState("false");

    const [nameUpdateFormState, setNameUpdateFormState] = useState({ newAssignmentName: ""});
    const [gradeUpdateFormState, setGradeUpdateFormState] = useState({ newAssignmentGrade: ""});

    const getCurrentStudent = async () => {

        const currentStudent = await axios.get(`/current-student/${studentId}`);

        return currentStudent.data;
    };

    const getCurrentClassName = async () => {

        const currentClass = await axios.get(`/teacher/current-class-name/${classId}`);

        return currentClass.data;
    };

    const getCurrentAssignment = async () => {

        const currentAssignment = await axios.get(`/teacher/current-assignment/${classId}/${studentId}/${assignmentId}`);

        return currentAssignment.data;
    }

    const handleNameUpdateFormChange = (event) => {
        const { name, value } = event.target;
        setNameUpdateFormState({
        ...nameUpdateFormState,
        [name]: value,
        });
    };

    const handleGradeUpdateFormChange = (event) => {
        const { name, value } = event.target;
        setGradeUpdateFormState({
        ...gradeUpdateFormState,
        [name]: value,
        });
    };

    const handleNameUpdateSubmit = async (event) => {

        event.preventDefault();

        const updatedAssignment = await axios.patch('/teacher/update-assignment-name', {
            assignmentId: assignmentId,
            newAssignmentName: nameUpdateFormState.newAssignmentName
        });

        window.location.reload();
    };

    const handleGradeUpdateSubmit = async (event) => {

        event.preventDefault();

        const updatedAssignment = await axios.patch('/teacher/update-assignment-grade', {
            studentId: studentId,
            classId: classId,
            assignmentId: assignmentId,
            newAssignmentGrade: gradeUpdateFormState.newAssignmentGrade
        });

        setShowGradeUpdateBox(!showGradeUpdateBox);
        window.location.reload();
    };

    const { data: currentStudent } = useQuery('getCurrentStudent', getCurrentStudent);
    const { data: currentClassName } = useQuery('getCurrentClassName', getCurrentClassName);
    const { data: currentAssignment } = useQuery('getCurrentAssignment', getCurrentAssignment);
    
    return(

        <div className="flex flex-col min-h-screen items-center ">

            {currentStudent && (<h1 className="mt-40 text-center text-4xl font-bold mb-8">{currentStudent.firstName} {currentStudent.lastName}</h1>)}
            {currentClassName && (<h1 className="text-center text-3xl mb-8 font-bold">{currentClassName}</h1>)}
            
            <div className="w-4/5 text-center font-bold border-2 border-black p-6 rounded-xl shadow-xl mb-8 xl:w-1/4">

            {currentAssignment && (<h2 className="text-center text-3xl font-bold mb-8">{currentAssignment.name}</h2>)}

            {showNameUpdateBox && (<button className="w-full border-2 border-black font-bold bg-gold p-5 rounded-xl shadow-xl hover:scale-105 " onClick={() => setShowNameUpdateBox(!showNameUpdateBox)}>Update Assignment Name</button>)}

            {!showNameUpdateBox && (<button className="w-full border-2 border-black font-bold bg-gold p-5 rounded-xl shadow-xl mb-2 hover:scale-105" onClick={() => setShowNameUpdateBox(!showNameUpdateBox)}>Cancel Update</button>)}

            {!showNameUpdateBox && (<form className="flex flex-col w-full mt-4 font-bold " onSubmit={handleNameUpdateSubmit}>

                                        <input className="w-full p-5  border-2 border-black rounded-xl shadow-xl" type= "text" placeholder="New Assignment Name..."name="newAssignmentName" onChange={handleNameUpdateFormChange}/>

                                        <button className="border-2 border-black bg-gold p-5 rounded-xl shadow-xl mt-5 hover:scale-105">Update Assignment Name</button>

                                    </form>)}

            </div>

            <div className="w-4/5 text-center font-bold border-2 border-black p-6 rounded-xl shadow-xl mb-8 xl:w-1/4">

            {currentAssignment && (<h2 className="text-center text-3xl font-bold mb-8 ">Grade: {currentAssignment.grade}%</h2>)}

            {showGradeUpdateBox && (<button className="w-full border-2 border-black text-center bg-gold p-4 rounded-xl shadow-xl hover:scale-105" onClick={() => setShowGradeUpdateBox(!showGradeUpdateBox)}>Update Assignment Grade</button>)}

            {!showGradeUpdateBox && (<button className="w-full border-2 border-black text-center mb-2  bg-gold p-4 rounded-xl shadow-xl hover:scale-105 mb-4" onClick={() => setShowGradeUpdateBox(!showGradeUpdateBox)}>Cancel Update</button>)}
        
            {!showGradeUpdateBox && (<form className="flex flex-col w-full" onSubmit={handleGradeUpdateSubmit}>

                                        <input className="w-full p-5  border-2 border-black rounded-xl shadow-xl" placeholder="New Assignment Grade..." type="number" name="newAssignmentGrade" onChange={handleGradeUpdateFormChange}/>

                                        <button className="border-2 border-black bg-gold p-5 rounded-xl shadow-xl mt-5 hover:scale-105">Update Assignment Grade</button>

                                     </form>)}
            </div> 

        </div>
    );
}