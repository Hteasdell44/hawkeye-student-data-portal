import { useParams } from "react-router";
import { useQuery } from "react-query";
import axios from "axios";

export default function ClassCatalogDisplay() {

    const { id } = useParams();

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

    const getCurrentStudentsClassesTeacher = async () => {

        const teachers = await axios.post('/current-student-classes-teachers', {
            studentId: id
        }); 

        return teachers.data;
    }

    const { data: studentData } = useQuery('getCurrentStudent', getCurrentStudent);

    const { data: classData } = useQuery('getCurrentStudentsClasses', getCurrentStudentsClasses);

    const { data: teacherData } = useQuery('getCurrentStudentsClassesTeachers', getCurrentStudentsClassesTeacher);

    console.log(teacherData);

    return (

        <div className="flex flex-col h-screen items-center ">

            {studentData &&(<h1 className="mt-40 text-center text-4xl mb-28 font-bold">{studentData.firstName}'s Classes:</h1>)}

            {classData && classData.map((classInstance, i) => (

                <a href={`/student/${studentData.id}/classes/${classInstance.id}`} className="border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105">
                
                    <div key={classInstance.id}>

                        <div className="">
                    
                            {teacherData && (<h1>{classInstance.name} - {teacherData[i].prefix} {teacherData[i].lastName}</h1>)}
                    
                            
                        </div>

                    </div>

                </a>
            ))}

        </div>

    );
}