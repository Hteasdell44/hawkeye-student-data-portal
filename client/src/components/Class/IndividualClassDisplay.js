import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function IndividualClassDisplay() {

    const { classId } = useParams();

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

    const { data: className } = useQuery('getCurrentClassName', getCurrentClassName);
    const { data: studentList } = useQuery('getCurrentClassesStudents', getCurrentClassesStudents);

    return(
    
        <div id="login-container" className="flex flex-col h-screen items-center ">

            {className && (<h1 className="mt-40 text-center text-4xl font-bold mb-8">{className}</h1>)}
        
            <h2 className="text-center text-2xl mb-8">Section {classId}</h2>

            {studentList && studentList.map((student) => (

                <a href={`/teacher/${classId}/${student.id}`} className="border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105">

                    <div key={student.id}>

                        <div className="">
                    
                            <h1>{student.firstName} {student.lastName} - {student.id}</h1>
                    
                        </div>

                    </div>

                </a>
            ))}

            
        </div>
    
    );
}