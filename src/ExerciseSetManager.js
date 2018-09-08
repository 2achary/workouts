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
      <div>
        <h4 className={"exercise-name"}>Incline Bench</h4>
        <table className={"table table-borderless"}>
          <thead className="">

            <tr>
              <th scope="col">Set</th>
              <th scope="col">Previous</th>
              <th scope="col">lbs</th>
              <th scope="col">Reps</th>
              <th scope="col">✔️</th>
            </tr>

            <tr>
              <td>1</td>
              <td>120 lbs x 6</td>
              <td>125</td>
              <td>4</td>
              <td>
                <div className={"form-check"}>
                  <input className={"form-check-input"} type="checkbox" value=""
                         id="defaultCheck1"/>
                </div></td>
            </tr>

             <tr>
              <td>1</td>
              <td>125 lbs x 4</td>
              <td>125</td>
              <td>4</td>
              <td>
                <div className={"form-check"}>
                  <input className={"form-check-input"}  type="checkbox"/>
                </div>
              </td>
            </tr>

          </thead>
        </table>
        <button className={"btn btn-sm btn-block btn-outline-primary add-set-button"}>Add Set</button>


        <h4 className={"exercise-name"}>Incline Bench</h4>
        <table className={"table table-borderless"}>
          <thead className="">

            <tr>
              <th scope="col">Set</th>
              <th scope="col">Previous</th>
              <th scope="col">lbs</th>
              <th scope="col">Reps</th>
              <th scope="col">✔️</th>
            </tr>

            <tr>
              <td>1</td>
              <td>120 lbs x 6</td>
              <td>125</td>
              <td>4</td>
              <td><input type="checkbox"/></td>
            </tr>

             <tr>
              <td>1</td>
              <td>125 lbs x 4</td>
              <td>125</td>
              <td>4</td>
              <td><input type="checkbox"/></td>
            </tr>

          </thead>
        </table>
        <button className={"btn btn-sm btn-block btn-outline-primary add-set-button"}>Add Set</button>
      </div>
    );
  }
}

export default ExerciseSetManager;