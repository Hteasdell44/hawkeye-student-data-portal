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
        let nullCount = 0;

        for (let i = 0; i < data.data.length; i++) {

            if (data.data[i].assignmentGrade == null) { 
                
                nullCount++;
                continue; 
            
            }

            sum += data.data[i].assignmentGrade;
        }

        const avg = sum / data.data.length - nullCount;

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

        <div className="flex flex-col h-full items-center ">

            {studentData && classData &&(<h1 className="mt-40 text-center text-4xl mb-8 font-bold">{studentData.firstName}'s {getClassName()} Assignments:</h1>)}

            {data && (<h1 className="w-4/5 border-2 border-gold p-8 text-xl text-center mb-8 rounded-xl shadow-xl font-bold xl:w-1/4">Cumulative Grade: {calculateAverage()}%</h1>)}

            {data && data.data.map((item, i) => (

                <div className="w-4/5 text-center text-xl font-bold border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105 xl:w-1/4">

                    <div key={item.assignment.id}>

                        <div className="">
                    
                            <h1>{item.assignment.name}</h1>
                            <h1 className="mt-2">{getAssignmentGrade(item)}%</h1>
                            
                        </div>

                    </div>

                </div>
            ))}

        </div>        
    );
}