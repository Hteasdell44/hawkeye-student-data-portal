import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

export default function StudentAssignmentListDisplay() {

    const { classId, studentId } = useParams();

    const getCurrentStudent = async () => {

        const currentStudent = await axios.get(`/current-student/${studentId}`);

        return currentStudent.data;
    };

    const getCurrentClassName = async () => {

        const currentClass = await axios.get(`/teacher/current-class-name/${classId}`);

        return currentClass.data;
    };

    const getAssignments = async () => {

        const assignmentList = await axios.get(`/get-student-assignments/${studentId}/${classId}`);

        return assignmentList;
    }

    const { data: currentStudent } = useQuery('getCurrentStudent', getCurrentStudent);
    const { data: currentClassName } = useQuery('getCurrentClassName', getCurrentClassName);
    const { data: assignmentList } = useQuery('getAssignments', getAssignments);

    const calculateAverage = () => {

        let sum = 0;
        let totalElements = 0;

        for (let i = 0; i < assignmentList.data.length; i++) {

            if (assignmentList.data[i].assignmentGrade !== null ) {

                sum += assignmentList.data[i].assignmentGrade;
                totalElements++;
            }
    
        }

        const avg = sum / totalElements;

        return avg.toFixed();
    }

    const getAssignmentGrade = (item) => {

        const grade = item.assignmentGrade;

        if (grade == null) {
            return '--'
        }

        return grade;
    }

    return(

         <div className="flex flex-col min-h-screen items-center">

            {currentStudent && currentClassName && (<h1 className="mt-40 text-center text-4xl mb-8 font-bold">{currentStudent.firstName}'s {currentClassName} Assignments:</h1>)}

            {assignmentList && (<h1 className="w-4/5 text-center font-bold text-xl border-2 border-gold p-10 rounded-xl shadow-xl mb-8 xl:w-1/4">Cumulative Grade: {calculateAverage()}%</h1>)}

            {assignmentList && assignmentList.data.map((item, i) => (

                <a href={`/teacher/${classId}/${studentId}/assignments/${item.assignment.id}`} className="w-4/5 text-center border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105 xl:w-1/4">

                    <div key={item.assignment.id}>

                        <div className="">
                    
                            <h1 className="font-bold text-xl">{item.assignment.name}</h1>
                            <h1 className="font-bold text-xl mt-2"><span>{getAssignmentGrade(item)}%</span></h1>
                            
                        </div>

                    </div>

                </a>
            ))}


        </div>

    );
}