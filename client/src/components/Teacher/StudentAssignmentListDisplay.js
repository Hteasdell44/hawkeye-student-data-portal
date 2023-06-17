import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

export default function StudentAssignmentListDisplay() {

    const { classId, studentId } = useParams();

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

    const getAssignments = async () => {

        const assignmentList = await axios.post('/get-student-assignments', {
            studentId: studentId,
            classId: classId,
        });

        return assignmentList;
    }

    const { data: currentStudent } = useQuery('getCurrentStudent', getCurrentStudent);
    const { data: currentClassName } = useQuery('getCurrentClassName', getCurrentClassName);
    const { data: assignmentList } = useQuery('getAssignments', getAssignments);

    const calculateAverage = () => {

        let sum = 0;

        for (let i = 0; i < assignmentList.data.length; i++) {

            sum += assignmentList.data[i].assignmentGrade;
        }

        const avg = sum / assignmentList.data.length;

        return avg.toFixed(2);
    }

    return(

         <div className="flex flex-col h-screen items-center ">

            {currentStudent && currentClassName && (<h1 className="mt-40 text-center text-4xl mb-28 font-bold">{currentStudent.firstName}'s {currentClassName} Assignments:</h1>)}

            {assignmentList && assignmentList.data.map((item, i) => (

                <a href={`/teacher/${classId}/${studentId}/assignments/${item.assignment.id}`} className="border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105">

                    <div key={item.assignment.id}>

                        <div className="">
                    
                            <h1>{item.assignment.name} - {item.assignmentGrade}</h1>
                            
                        </div>

                    </div>

                </a>
            ))}

        {assignmentList && (<h1>{calculateAverage()}</h1>)}

        </div>

    );
}