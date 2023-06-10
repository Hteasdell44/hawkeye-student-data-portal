import { useParams } from "react-router";
import { useQuery } from "react-query";
import axios from "axios";

export default function StudentBehaviorDisplay() {

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

            {data && (<h1 className="mt-40 text-center text-4xl mb-28 font-bold">{data.firstName}'s Behavior Report</h1>)}

            {data && (<p>{data.firstName} {data.behaviorReport}</p>)}

        </div>

    );
}