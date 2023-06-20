import { useParams } from "react-router";
import { useQuery } from "react-query";
import axios from "axios";

export default function ClassCatalogDisplay() {

    const { id } = useParams();

    const getCurrentStudent = async () => {

        const currentStudent = await axios.get(`/current-student/${id}`);

        return currentStudent.data;
    }

    const getCurrentStudentsClasses = async () => {

        const studentsClasses = await axios.get(`/current-student-classes/${id}`);

        return studentsClasses.data;
    }

    const getCurrentStudentsClassesTeacher = async () => {

        const teachers = await axios.get(`/current-student-classes-teachers/${id}`); 

        return teachers.data;
    }

    const { data: studentData } = useQuery('getCurrentStudent', getCurrentStudent);

    const { data: classData } = useQuery('getCurrentStudentsClasses', getCurrentStudentsClasses);

    const { data: teacherData } = useQuery('getCurrentStudentsClassesTeachers', getCurrentStudentsClassesTeacher);

    console.log(teacherData);

    return (

        <div className="flex flex-col h-full items-center ">

            {studentData &&(<h1 className="mt-40 text-center text-4xl mb-8 font-bold">{studentData.firstName}'s Classes:</h1>)}

            {classData && classData.map((classInstance, i) => (

                <a href={`/student/${studentData.id}/classes/${classInstance.id}`} className="w-4/5 text-center text-xl font-bold border-2 border-black mb-8 p-10 rounded-xl shadow-xl hover:scale-105 xl:w-1/4">
                
                    <div key={classInstance.id}>

                        <div className="">
                    
                            <h1><span>{classInstance.name}</span></h1>

                            {teacherData && (<h1 className="mt-2">{teacherData[i].prefix} {teacherData[i].lastName}</h1>)}
                    
                            
                        </div>

                    </div>

                </a>
            ))}

        </div>

    );
}