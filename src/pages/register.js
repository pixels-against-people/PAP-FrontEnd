/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import './login.css'
import { Link, Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:4000')


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: '',
      redirect: false,
    }
  }

  componentWillMount() {
    socket.on('registerres', res => {
      console.log(res)
      if (res.result === 'Success') {
        localStorage.setItem('cahToken', res.token)
        // will activate the redirect component, sending user to the next page when the page renders
        this.setState({ redirect: true })
      }
    })
  }

  handleClick() {
    // checking login credentials
    const { email, name, password, passwordConf } = this.state
    const body = { email, name, password, passwordConf }
    console.log(body)
    socket.emit('Register', body)
  }

  render() {
    return (
      <div className="authContainer">
        <h1>CAH</h1>
        { this.state.redirect && <Redirect to="/" /> }
        <div className="signup">
          <h2>Join Today</h2>
          <input type="text" name="name" placeholder="Nickname" onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
          <input type="text" name="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
          <input type="text" name="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
          <input type="text" name="passwordConf" placeholder="Password" onChange={e => this.setState({ passwordConf: e.target.value })} value={this.state.passwordConf} />
          <button type="submit" name="register" onClick={() => this.handleClick()}>Register</button>
          <span>
              Already Have an Account?
            <Link to="/login"> Login</Link>
          </span>
        </div>
      </div>
    )
  }
}

export default Register
