/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import './login.css'
import { Link, Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:4000')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false,
      loginFail: false,
      userId: '',
    }
  }

  componentWillMount() {
    socket.on('loginres', res => {
        if (res.result === 'Success') {
          localStorage.setItem('cahToken', res.token)
          // will activate the redirect component, sending user to the next page when the page renders
          this.setState({
            redirect: true,
          })
        } else {
          // renders a box stating the username or password is incorrect
          this.setState({ loginFail: true })
        }
    })
  }
    

  handleClick() {
    // checking login credentials
    const { email, password } = this.state
    const body = { email, password }
    socket.emit("Login", body)
  }

  render() {
    const { redirect } = this.state
    return (
      <div className="authContainer">
        <h1>CAH</h1>
        <div className="signup">
          {redirect && <Redirect to="/" />}
          <h1>Welcome Back</h1>
          {this.state.loginFail && <div className="loginFail"><span>Username or Password Incorrect</span></div>}
          <input type="text" name="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
          <input type="text" name="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
          <button type="submit" name="register" onClick={() => this.handleClick()}>Login</button>
          <span>
            New around here?
            <Link to="/register"> Create an Account</Link>
          </span>
        </div>
      </div>
    )
  }
}

export default Login