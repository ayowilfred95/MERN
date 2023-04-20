import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

function WorkoutForm() {

    const {dispatch } = useWorkoutsContext()

    // create the state for each of different props that users is going to type in
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
   

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields)
            console.log(json.error);

        }
        if(response.ok){
            setEmptyFields([])
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added', json);
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }

    }

  return (
    // create a form
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label htmlFor="title">Exercise Title:</label>
        <input 
            type="text" 
            onChange={(e)=> setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

        <label htmlFor="load">Load(in Kg):</label>
        <input 
            type="text" 
            onChange={(e)=> setLoad(e.target.value)} 
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
            /> 

        <label htmlFor="reps">Reps :</label>
        <input 
            type="text" 
            onChange={(e)=> setReps(e.target.value)} 
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
            />  

        <button>Add Workout</button>   
        {error && <div className='error'>{error}</div>}

    </form>

  )
}

export default WorkoutForm;
