import { useParams } from "react-router";
import { useQuery } from "react-query";
import axios from "axios";

export default function OptionsDisplay() {

    const { id } = useParams();

    const getCurrentStudent = async () => {

        const currentStudent = await axios.post('/current-student',{
            studentId: id
        });

        return currentStudent.data;
    }

    const { data } = useQuery('getCurrentStudent', getCurrentStudent);

    return(

        <div className="flex flex-col h-screen items-center ">

            <h1 className="mt-40 text-center text-4xl mb-28 font-bold">Would You Like To:</h1>

            {data && (<a href={`/student/${data.id}/classes`} className="bg-gold border-2 border-black p-10 text-2xl rounded-xl shadow-2xl mb-20 hover:scale-105">View {data.firstName}'s Classes</a>)}

            <h1 className="text-center text-4xl mb-20 font-bold">Or:</h1>

            {data && (<a href={`/student/${data.id}/behavior`} className="bg-gold border-2 border-black p-10 text-2xl rounded-xl shadow-2xl hover:scale-105">View {data.firstName}'s Behavior Report</a>)}

        </div>
    );
}