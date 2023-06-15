import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function AssignmentListDisplay() {

    const { id, classId } = useParams();

    const getAssignments = async () => {

        const assignmentList = await axios.post('/get-student-assignments', {
            studentId: id,
            classId: classId,
        });

        return assignmentList;
    }

    const getCurrentStudent = async () => {

        const currentStudent = await axios.post('/current-student',{
            studentId: id
        });

        return currentStudent.data;
    }

    const getCurrentStudentsClasses = async () => {

        const studentsClasses = await axios.post('/current-student-classes', {
            studentId: id
        });

        return studentsClasses.data;
    }

    const { data: studentData } = useQuery('getCurrentStudent', getCurrentStudent);

    const { data } = useQuery('getAssignments', getAssignments);

    const { data: classData } = useQuery('getCurrentStudentsClasses', getCurrentStudentsClasses);

    const getClassName = () => {

        for (let j = 0; j < classData.length; j++){

            if (classData[j].id == classId) {
                
                return classData[j].name;
            }
        }
    };
    

    const calculateAverage = () => {

        let sum = 0;

        for (let i = 0; i < data.data.length; i++) {

            sum += data.data[i].assignmentGrade;
        }

        const avg = sum / data.data.length;

        return avg.toFixed(2);
    }
     
    return(

        <div className="flex flex-col h-screen items-center ">

            {studentData && classData &&(<h1 className="mt-40 text-center text-4xl mb-28 font-bold">{studentData.firstName}'s {getClassName()} Assignments:</h1>)}

            {data && data.data.map((item, i) => (

                <a href={`/student/${id}/classes/${classId}`} className="border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105">

                    <div key={item.assignment.id}>

                        <div className="">
                    
                            <h1>{item.assignment.name} - {item.assignmentGrade}</h1>
                            
                        </div>

                    </div>

                </a>
            ))}

            {data && (<h1>{calculateAverage()}</h1>)}

        </div>        
    );
}