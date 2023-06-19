import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function TeacherOptionsDisplay() {

    const { classId, studentId } = useParams();

    const getCurrentStudent = async () => {

        const currentStudent = await axios.post('/current-student', {
            studentId: studentId
        });

        return currentStudent.data;
    };

    const { data } = useQuery('getCurrentStudent', getCurrentStudent);

    console.log(data)

    return(

        <div className="flex flex-col min-h-screen items-center font-bold">

            <h1 className="mt-40 text-center text-4xl mb-24 font-bold">Would You Like To:</h1>

            {data && (<a href={`/teacher/${classId}/${studentId}/assignments`} className="w-4/5 text-center  bg-gold border-2 border-black p-10 text-2xl rounded-xl shadow-2xl mb-20 hover:scale-105 xl:w-1/4" >View  {data.firstName}'s Assignments</a>)}

            <h1 className="text-center text-4xl mb-20 font-bold">Or:</h1>

            {data && (<a href={`/teacher/${classId}/${studentId}/behavior`} className="w-4/5 text-center bg-gold border-2 border-black p-10 text-2xl rounded-xl shadow-2xl hover:scale-105 xl:w-1/4">Update {data.firstName}'s Behavior Report</a>)}

        </div>

    );
}