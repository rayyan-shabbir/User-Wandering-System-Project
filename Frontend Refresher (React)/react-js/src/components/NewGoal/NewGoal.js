import React, {useState} from 'react'
import './NewGoal.css'

const NewGoal = (props) => {
    let [enteredText, setEnteredText] = useState('');

    const addGoalHandler = (event) => {
        event.preventDefault();

        const newGoal = {id: Math.random.toString(), text: enteredText};

        setEnteredText('');

        props.onAddGoal(newGoal);
    }

    const addTextHandler = (event) => {
        setEnteredText(event.target.value);
    }

    return (
        <form className="new-goal" onSubmit={addGoalHandler}>
            <input type="text" value={enteredText} onChange={addTextHandler}/>
            <input type="submit" value="Add Goal" />
        </form>
    )
}

export default NewGoal
