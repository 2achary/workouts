import React from 'react';
// import {Inplace} from 'primereact/inplace';
// import {} from 'primereact/inplace'
import {
  Inplace,
  InplaceContent,
  InplaceDisplay
} from "primereact/components/inplace/Inplace";
import {InputText} from 'primereact/inputtext';
import {Dialog} from "primereact/components/dialog/Dialog";
import {Button} from "primereact/components/button/Button";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";

class ExerciseSetManager extends React.Component {
  state = {
    exercises: [],
    exercise: {},
    filteredExercisesSingle: [],
    workouts: [],
    sets: []
  };

  workoutRef = React.createRef();
  exerciseRef = React.createRef();

  componentDidMount() {
    fetch(`http://localhost:8000/api/exercises/`)
        .then(r => r.json())
        .then(exercises => {
          this.setState({exercises: exercises})
        });
    fetch(`http://localhost:8000/api/workouts/`)
        .then(r => r.json())
        .then(workouts => {
          this.setState({workouts});
        });
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  createNewSet = (event) => {
    let body;
    event.preventDefault();
    console.log(this.exerciseRef.current.value);
    console.log(this.workoutRef);
    body = {
      exercise_id: this.exerciseRef.current.value,
      workout_id: this.workoutRef.current.value,
    };
    console.log(body);
    fetch(`http://localhost:8000/api/new-set-from-existing/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
        .then(r => r.json())
        .then(set => {
          this.setState(prevState => ({
            sets: [...prevState.sets, set]
          }));
        });
    event.currentTarget.reset();

  };

  filterExerciseSingle = (event) => {
        setTimeout(() => {
            var results = this.state.exercises.filter((exercise) => {
                return exercise.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
            this.setState({ filteredExercisesSingle: results });
        }, 250);
    }


  render() {
    return (
        <div className="empty-workout-container">
          <p>
            {this.props.sets.map((set) => {
              console.log(set)
              return (`${set.set_number} - ${set.weight || 0} x ${set.actual_reps || set.goal_reps || 0} `);
            })}
          </p>
        </div>
    );
  }
}

export default ExerciseSetManager;