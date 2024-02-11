import {useState} from "react";
import {useWorkoutsContext} from "../Hooks/useWorkoutsContext"


const WorkoutForm = () => {
    //Creating the Workout Form
    //States of each field, intially
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    //These fields will be updated automatically as shown below

    const handleSubmit = async (e) => {
        //Default action is to refresh the page, we don't want that
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json() //Http requests goes thru func defined in backend workouts file
        
        if (!response.ok){
            //If we get an error when creating a form
            setError(json.error) //Return the error in json
            setEmptyFields(json.emptyFields)

            console.log(error);
        }

        if (response.ok){
            //If no error was encoutered, reset form attrs and display in console created form in json
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log('New workout created', json);
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }

    };
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            {/*Form that allows us to enter the Title, Load, and Reps*/}
            <label>Exercise Title:</label>
            <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error': ''}
            ></input>

            <label>Exercise Load (in kg):</label>
            <input 
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error': ''}
            ></input>

            <label>Reps:</label>
            <input 
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error': ''}
            ></input>

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
            {/* Above displays error message to screen */}
            
        </form>
    ) 
}

export default WorkoutForm;