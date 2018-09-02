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

class EmptyWorkout extends React.Component {
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
          <div className="workout-container">
            <Inplace closable={true}>
              <InplaceDisplay>
                New Workout
              </InplaceDisplay>
              <InplaceContent>
                <InputText value={"New Workout"}/>
              </InplaceContent>
            </Inplace>
            <div>
              <textarea placeholder={"Notes"}></textarea>
            </div>

            <button className={"btn btn-sm btn-primary btn-block"} onClick={(e) => this.setState({visible: true})}>Add Exercise</button>

            <button className={"btn btn-sm btn-danger btn-block"} >Cancel Workout</button>

            </div>
          <Dialog header="Choose Exercise" visible={this.state.visible}
                  width="350px" modal={true}
                  onHide={(e) => this.setState({visible: false})} positionTop={0}>
            <AutoComplete value={""}
                          suggestions={this.state.filteredExercisesSingle}
                          completeMethod={this.filterExerciseSingle}
                          field="name"
                          size={30} placeholder="Choose Exercise" minLength={1}
                          onChange={(e) => this.setState({exercise: e.value})}/>
          </Dialog>

        </div>
    );
  }
}

export default EmptyWorkout;