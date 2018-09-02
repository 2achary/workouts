import React from 'react';

class EmptyWorkout extends React.Component {
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
        <div className="empty-workout-container">
          <h3>New Workout</h3>
          <div>
            <textarea placeholder={"Notes"}></textarea>
          </div>

          <button className={"btn btn-sm btn-primary btn-block"} data-toggle="modal" data-target="#exampleModal">Add Exercise</button>

          <button className={"btn btn-sm btn-danger btn-block"} >Cancel Workout</button>

          <div className={"modal fade"} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={"modal-dialog"} role="document">
              <div className={"modal-content"}>
                <div className={"modal-header"}>
                  <h5 className={"modal-title"} id="exampleModalLabel">Modal title</h5>
                  <button type="button" className={"close"} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className={"modal-body"}>
                  ...
                </div>
                <div className={"modal-footer"}>
                  <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Close</button>
                  <button type="button" className={"btn btn-primary"}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default EmptyWorkout;