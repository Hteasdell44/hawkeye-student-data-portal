import { useParams } from "react-router";
import { useQuery } from "react-query";
import axios from "axios";

export default function StudentBehaviorDisplay() {

    const { id } = useParams();

    const getCurrentStudent = async () => {

        const currentStudent = await axios.get(`/current-student/${id}`);

        return currentStudent.data;
    }

    const { data } = useQuery('getCurrentStudent', getCurrentStudent);

    return(

        <div className="flex flex-col h-screen items-center ">

            {data && (<h1 className="mt-40 text-center text-4xl mb-28 font-bold">{data.firstName}'s Behavior Report</h1>)}

            {data && (<p className="w-4/5 text-2xl border-2 border-black p-4 rounded-xl shadow-xl text-center xl:w-1/4 ">{data.firstName} {data.behaviorReport}</p>)}

        </div>

    );
}