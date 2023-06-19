import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from 'react';


export default function IndividualClassDisplay() {

    const { classId } = useParams();
    const [assignmentInput, setAssignmentInput] = useState("false");

    const [formState, setFormState] = useState({newAssignmentName:""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const getCurrentClassName = async () => {

        const currentClass = await axios.post('/teacher/current-class-name', {
            classId: classId
        });

        return currentClass.data;
    };

    const getCurrentClassesStudents = async () => {

        const studentsList = await axios.post('/teacher/current-classes-students', {
            classId: classId
        });

        return studentsList.data;
    };

    const addNewAssignment = async (event) => {

        event.preventDefault();

        const newAssignment = await axios.post('/teacher/add-new-assignment', {
            newAssignmentName: formState.newAssignmentName,
            classId: classId
        });

        setAssignmentInput(!assignmentInput);
        return newAssignment.data;
    }

    const { data: className } = useQuery('getCurrentClassName', getCurrentClassName);
    const { data: studentList } = useQuery('getCurrentClassesStudents', getCurrentClassesStudents);

    return(
    
        <div id="login-container" className="flex flex-col min-h-screen items-center ">

            {className && (<h1 className="mt-40 text-center text-4xl font-bold mb-8">{className}</h1>)}
        
            <h2 className="text-center text-2xl mb-8 font-bold">Section {classId}</h2>

            {assignmentInput && (<button className="w-4/5 border-2 border-black bg-gold mb-8 rounded-xl shadow-xl p-4 font-bold hover:scale-105 xl:w-1/4" onClick={() => setAssignmentInput(!assignmentInput)}>Add New Assignment</button>)}
            {!assignmentInput && (

                <form className="w-4/5 border-2 border-black p-8 rounded-xl shadow-xl mb-8 font-bold items-center xl:w-1/4" onSubmit={addNewAssignment}>

                    <div className="flex flex-row items-center justify-center">

                        <label>Assignment Name</label>
                        <input className="border-2 border-black ml-2 p-2 rounded-xl" name="newAssignmentName" onChange={handleChange}/>

                    </div>

                    <button type="submit" className="w-full bg-gold border-2 border-black p-2 mt-8 rounded-xl shadow-xl">Add New Assignment</button>
                    
                </form>)}

                {!assignmentInput && (<button className="w-4/5 border-2 border-black bg-gold mb-8 rounded-xl shadow-xl p-4 font-bold hover:scale-105 xl:w-1/4" onClick={() => setAssignmentInput(!assignmentInput)}>Cancel</button>)}


            {studentList && studentList.map((student) => (

                <a href={`/teacher/${classId}/${student.id}`} className="w-4/5 text-xl text-center border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105 xl:w-1/4">

                    <div key={student.id}>

                        <div className="font-bold">
                    
                            <h1 className="font-bold"> {student.firstName} {student.lastName}</h1>
                            <h1 className="mt-2"><span className="text-gray-400">{student.id}</span></h1>
                    
                        </div>

                    </div>

                </a>
            ))}

            
        </div>
    
    );
}