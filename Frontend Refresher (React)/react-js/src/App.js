import './App.css';
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';
import React, {useState} from "react";

function App() {
  const [courseGoals, setCourseGoals] = useState([
    {id:'cg1', text: "Finished the course"},
    {id:'cg2', text: "Cover all topics"},
    {id:'cg3', text: "Help Others in Q&A"}
  ]); 

  const addNewGoalHandler = (newGoal) => {
    // setCourseGoals(courseGoals.concat(newGoal));

    setCourseGoals((prevCourseGoals) => prevCourseGoals.concat(newGoal));
  }

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler}/>
      <GoalList goals = {courseGoals}/>
    </div>
  );
}

export default App;
