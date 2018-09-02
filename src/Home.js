import React from 'react';

class Home extends React.Component {
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
        <div className="">
          <h3>Start Workout</h3>
          <p className="text-muted text-uppercase">Quick Start</p>
          <a href={"/empty_workout"}><button className={"btn btn-sm btn-primary btn-block"}>Start an Empty Workout</button></a>
        </div>
    );
  }
}

export default Home;