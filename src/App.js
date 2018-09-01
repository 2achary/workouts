import React from 'react';

class App extends React.Component {
  state = {
    exercises: [],
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


  render() {
    return (
        <div className="catch-of-the-day">
          <form onSubmit={this.createNewSet}>
            <div>
              <label htmlFor="workouts">Select Workout</label>
              <select name="workouts" id="workouts" ref={this.workoutRef}>
                {
                  this.state.workouts.map((workout) => {
                    return (<option key={workout.id}
                        value={workout.id}>{new Date(workout.date_created).toDateString() + " - " + workout.name}</option>)
                  })
                }
              </select>
            </div>
            <div>
              <label htmlFor="exercises">Select Exercise</label>
              <select name="exercies" id="exercises" ref={this.exerciseRef}>
                {
                  this.state.exercises.map((exercise) => {
                    return (
                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>)
                  })
                }
              </select>
            </div>
            <button className="btn btn btn-outline-dark btn-sm" type="submit">Create New
            </button>
          </form>
            <ul>
              {this.state.sets.map((set) => {
                return (<li key={set.id}>{set.actual_reps} + " x " + {set.weight}</li>)
              })}
            </ul>
        </div>
    );
  }
}

export default App;