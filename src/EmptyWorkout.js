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
import ExerciseSetManager from "./ExerciseSetManager";
import {sendApiRequest, API_URL} from "./helpers";

class EmptyWorkout extends React.Component {
  state = {
    exercises: [],
    exercise: {},
    filteredExercisesSingle: [],
    workout: {},
    sets: []
  };

  workoutRef = React.createRef();
  exerciseRef = React.createRef();

  componentDidMount() {
    this.getExercises();
    this.createNewWorkout();
  }

  getExercises = () => {
    sendApiRequest(
        `${API_URL}exercises/`,
        null,
        'GET',
        (exercises) => {
          this.setState({exercises})
        }
    );
  };

  createNewWorkout = () => {
    let newWorkoutPostBody = {
      name: 'New Workout',
      is_routine: false,
    };
    sendApiRequest(
        `${API_URL}workouts/`,
        newWorkoutPostBody,
        'POST',
        (workout) => {console.log(workout); this.setState({workout})
    });
  };

  getExerciseSets = () => {
    sendApiRequest(
        `${API_URL}exercise-sets/?workout_id=${this.state.workout.id}`,
        null,
        'GET',
        (sets) => {
          this.setState({sets});
        }
    )
  };

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  createNewSet = () => {
    let body;

    body = {
      exercise_id: this.state.exercise.id,
      workout_id: this.state.workout.id,
    };

    sendApiRequest(
        `${API_URL}new-set-from-existing/`,
        body,
        'POST',
        this.getExerciseSets
    );
  };

  filterExerciseSingle = (event) => {
    setTimeout(() => {
      let results = this.state.exercises.filter((exercise) => {
        return exercise.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
      this.setState({filteredExercisesSingle: results});
    }, 250);
  };

  onAddExercise = () => {
    this.createNewSet();
    this.state.visible = false;
  };

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
            {this.state.sets.map((set) => {
              return (<ExerciseSetManager key={set.id} sets={this.state.sets}></ExerciseSetManager>)
            })}

            <button className={"btn btn-sm btn-primary btn-block"} onClick={(e) => {this.setState({visible: true});
            }}>Add Exercise</button>

            <button className={"btn btn-sm btn-danger btn-block"} >Cancel Workout</button>

            </div>
          <Dialog className={"add-exercise-dialog"} header="Choose Exercise" visible={this.state.visible}
                  width="350px" modal={true}
                  onHide={(e) => this.setState({visible: false})} positionTop={0}>
            <AutoComplete value={""}
                          dropdown={true}
                          className={"filter-exercise-dialog"}
                          suggestions={this.state.filteredExercisesSingle}
                          completeMethod={this.filterExerciseSingle}
                          field="name"
                          size={30} placeholder="Choose Exercise" minLength={1}
                          onChange={(e) => {
                            this.setState({exercise: e.value})
                          }}/>
            <button className={"btn btn-sm btn-primary"} onClick={this.onAddExercise}>Add Exercise</button>
          </Dialog>

        </div>
    );
  }
}

export default EmptyWorkout;