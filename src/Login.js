import React from 'react';
import {sendApiRequest} from "./helpers";
import {Messages} from 'primereact/messages';
import {Message} from 'primereact/message';
import {Redirect} from 'react-router-dom'


class Login extends React.Component {
  state = {
    goHome: false
  };

  usernameRef = React.createRef();
  passwordRef = React.createRef();

  componentDidMount() {

  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  showError() {
    this.messages.show({
      severity: 'error',
      summary: 'Error Message',
      detail: 'Validation failed',
      sticky: true
    });
  }

  login = (event) => {
    event.preventDefault();
    sendApiRequest(
        'http://127.0.0.1:8000/api-token-auth/',
        {
          username: this.usernameRef.current.value,
          password: this.passwordRef.current.value,
        },
        'POST',
        (response) => {
          console.log(response);
          if (response.token) {
            localStorage.setItem('api-token', JSON.stringify(response.token));
            this.setState({goHome: true});
          } else {
            this.showError();
          }

        }
    );
  };


  render() {
    if (this.state.goHome) {
      return <Redirect to="/"/>
    }
    return (

        <div className={"container"}>
          <Messages ref={(el) => this.messages = el} />


          <form onSubmit={this.login}>
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

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>


    );
  }
}

export default Login;