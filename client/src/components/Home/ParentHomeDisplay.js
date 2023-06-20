import AuthService from "../../utils/auth";
import { useState } from "react";
import axios from "axios";
import { useQuery } from 'react-query';

export default function ParentHomeDisplay() {

    const currentParent = AuthService.getProfile().data;

    // Student Id Entry Form

    const [formState, setFormState] = useState({ studentId: "" }); 
    const [showForm, setShowForm] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Form DB Call

    const linkStudentToParent = async (event) => {

        event.preventDefault();

        const updatedParent = await axios.post('/add-student', {
            parentEmail: currentParent.email,
            studentId: formState.studentId.trim()
        });

        setShowForm(false);
        window.location.reload();
    }

    const getCurrentParentsStudents = async () => {

        const currentParentsStudents = await axios.get(`/parents-students/${currentParent.email}`);

        return currentParentsStudents.data;
    }

    const { data } = useQuery('getStudents', getCurrentParentsStudents);

    return(

        <div id="login-container" className="flex flex-col min-h-screen items-center ">

            <h1 className="mt-40 text-center text-4xl font-bold mb-8">Welcome, {currentParent.firstName} {currentParent.lastName}!</h1>
            {data && data.length !== 0 && (<h2 className="text-center text-3xl font-bold mb-8">View Your Children:</h2>)}
            {data && data.length == 0 && (<h2 className="text-center text-3xl mb-8">Click Below To Add Your Children:</h2>)}

            {data && data.map((student) => (

            <a href={`/student/${student.id}`} className="font-bold text-xl text-center border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105">

                <div key={student.id}>

                    <div className="">
                
                        <h1>{student.firstName} {student.lastName} | <span className="text-gray-400">{student.id}</span></h1>
                        <h1 className="mt-2 text-left">{student.grade} Grade</h1>
                
                    </div>

                </div>

            </a>
            ))}

            {!showForm && (<button className="border-2 border-black w-4/5 bg-gold text-black text-2xl p-8 rounded-xl shadow-2xl hover:scale-105 xl:w-1/4" onClick={() => setShowForm(true)}>Add Student</button>)}
            {showForm && (<button className="border-2 border-black w-4/5 bg-gold text-black text-2xl p-8 mb-8 rounded-xl shadow-2xl hover:scale-105 xl:w-1/4" onClick={() => setShowForm(false)}>Cancel</button>)}

            {showForm && (<form className="w-4/5 xl:w-1/4" onSubmit={linkStudentToParent}>

                
                <div className="text-center border-2 border-gold p-8 mb-4 rounded-xl shadow-2xl">
                    <h3 className="text-center mb-3">Enter Your Student's 7 Digit School ID Number</h3>
                    <input type="number" name="studentId" className="border-2 border-black bg-gray-100 rounded-xl w-3/5 p-3 mr-1 xl:w-1/2" onChange={handleChange} placeholder="Example: 8630923"/>
                    <button className="border-2 border-black bg-gold rounded-xl shadow-2xl p-3 hover:scale-105" type="submit">Submit</button>
                </div>
            </form>
            )}

        </div>

    );
};