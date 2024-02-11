import { useEffect } from "react"; //Required imported to use UseEffect and Use State
import {useWorkoutsContext} from "../Hooks/useWorkoutsContext"
//Components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () =>{
            const response = await fetch('/api/workouts') //Fetching data from backend,
            //Also, add proxy field in package.json with localhost 4000 as backend is hosted there
            const json = await response.json()//

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }   
        }

        fetchWorkouts() //Fetch next workout
        },[dispatch])

    //This code diplays data from the backend on the frontend 
    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                //Check
                <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
           <WorkoutForm />
        </div>
    )
}

export default Home