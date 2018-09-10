import React from 'react';
import {Messages} from 'primereact/messages';
import {Message} from 'primereact/message';
import {sendApiRequest} from "./helpers";
import {Redirect} from 'react-router-dom'

export class Landing extends React.Component {
  state = {
  };

  usernameRef = React.createRef();
  passwordRef = React.createRef();
  emailRef = React.createRef();
  passwordConfirmRef = React.createRef();

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

  showError(msg) {
    this.messages.show({
      severity: 'error',
      summary: JSON.stringify(msg) || 'Error Message',
      detail: 'Validation failed',
      sticky: true
    });
  }

  register = (event) => {
    event.preventDefault();
    sendApiRequest(
        'http://127.0.0.1:8000/api/users/create-account',
        {
          username: this.usernameRef.current.value,
          password: this.passwordRef.current.value,
          email: this.emailRef.current.value
        },
        'POST',
        (response) => {
          console.log(response);
          if (response.token) {
            localStorage.setItem('token', JSON.stringify(response.token));
            this.setState({goToLogin: true});
          } else {
            console.log(response);
            this.showError(response);
          }

        }
    );
  }


  render() {
    if (this.state.goToLogin) {
      return <Redirect to="/login"/>
    }
    return (
        <div className={"container"}>
          <Messages ref={(el) => this.messages = el} />

          <h2>Sign Up</h2>
          <form onSubmit={this.register}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control"
                     id="exampleInputEmail1"
                     ref={this.emailRef}
                     placeholder="Enter username"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input type="text" className="form-control"
                     id="exampleInputEmail1"
                     ref={this.usernameRef}
                     placeholder="Enter username"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control"
                     id="exampleInputPassword1" placeholder="Password"
                     ref={this.passwordRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input type="password" className="form-control"
                     id="exampleInputPassword1" placeholder="Password"
                     ref={this.passwordConfirmRef}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <div className={"sign-in-section"}>
          <p>Already have an account?</p> <button className={"btn btn btn-outline-primary btn-sm"}>Sign In</button>
          </div>
        </div>
    );
  }
}

