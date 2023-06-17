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

        const currentStudent = await axios.post('/current-student', {
            studentId: studentId
        });

        return currentStudent.data;
    };

    const getCurrentClassName = async () => {

        const currentClass = await axios.post('/teacher/current-class-name', {
            classId: classId
        });

        return currentClass.data;
    };

    const getCurrentAssignment = async () => {

        const currentAssignment = await axios.post('/teacher/current-assignment', {
            classId: classId,
            studentId: studentId,
            assignmentId: assignmentId
        });

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

        const updatedAssignment = await axios.post('/teacher/update-assignment-name', {
            assignmentId: assignmentId,
            newAssignmentName: nameUpdateFormState.newAssignmentName
        });

        window.location.reload();
    };

    const handleGradeUpdateSubmit = async (event) => {

        event.preventDefault();

        const updatedAssignment = await axios.post('/teacher/update-assignment-grade', {
            studentId: studentId,
            classId: classId,
            assignmentId: assignmentId,
            newAssignmentGrade: gradeUpdateFormState.newAssignmentGrade
        });

        window.location.assign(`/teacher/${classId}/${studentId}/assignments`);
    };

    const { data: currentStudent } = useQuery('getCurrentStudent', getCurrentStudent);
    const { data: currentClassName } = useQuery('getCurrentClassName', getCurrentClassName);
    const { data: currentAssignment } = useQuery('getCurrentAssignment', getCurrentAssignment);

    return(

        <div className="flex flex-col h-screen items-center ">

            {currentStudent && currentClassName && (<h1 className="mt-40 text-center text-4xl mb-8 font-bold">{currentStudent.firstName} {currentStudent.lastName} - {currentClassName}</h1>)}

            {currentAssignment && (<h2 className="text-center text-3xl font-bold mb-8">{currentAssignment.name}</h2>)}

            {showNameUpdateBox && (<button className="bg-gold p-5 rounded-xl shadow-xl mb-8" onClick={() => setShowNameUpdateBox(!showNameUpdateBox)}>Update Assignment Name</button>)}

            {!showNameUpdateBox && (<button className="bg-gold p-5 rounded-xl shadow-xl mb-8" onClick={() => setShowNameUpdateBox(!showNameUpdateBox)}>Cancel Update</button>)}

            {!showNameUpdateBox && (<form className="flex flex-col w-2/5" onSubmit={handleNameUpdateSubmit}>

                                        <input className="w-full p-5  border-2 border-black rounded-xl shadow-xl" type= "text" placeholder="New Assignment Name..."name="newAssignmentName" onChange={handleNameUpdateFormChange}/>

                                        <button className="bg-gold p-5 rounded-xl shadow-xl mt-5 mb-8">Update Assignment Name</button>

                                    </form>)}

            {currentAssignment && (<h2 className="text-center text-3xl font-bold mb-8 ">Grade: {currentAssignment.grade}%</h2>)}

            {showGradeUpdateBox && (<button className="text-center mb-8 ml-8 bg-gold p-4 rounded-xl shadow-xl" onClick={() => setShowGradeUpdateBox(!showGradeUpdateBox)}>Update Grade</button>)}

            {!showGradeUpdateBox && (<button className="text-center mb-8 ml-8 bg-gold p-4 rounded-xl shadow-xl" onClick={() => setShowGradeUpdateBox(!showGradeUpdateBox)}>Cancel Update</button>)}
        
            {!showGradeUpdateBox && (<form className="flex flex-col w-2/5" onSubmit={handleGradeUpdateSubmit}>

                                        <input className="w-full p-5  border-2 border-black rounded-xl shadow-xl" placeholder="New Assignment Grade..." type="number" name="newAssignmentGrade" onChange={handleGradeUpdateFormChange}/>

                                        <button className="bg-gold p-5 rounded-xl shadow-xl mt-5 mb-8">Update Assignment Grade</button>

                                     </form>)}

        </div>
    );
}