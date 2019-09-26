/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import './login.css'
import { Link, Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client'

// const socket = openSocket('http://localhost:4000')
const socket = openSocket('https://master.d1adweuj5yrtvv.amplifyapp.com')

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: '',
      redirect: false,
      registerFail: false,
      registerMsg: '',
    }
  }

  componentWillMount() {
    socket.on('authRes', res => {
      console.log("response recieved")
      if (res.result === 'Success') {
        localStorage.setItem('cahToken', res.token)
        // will activate the redirect component, sending user to the next page when the page renders
        this.setState({ redirect: true })
      } else {
        this.setState({ registerFail: true, registerMsg: 'This email is already in use' })
      }
    })
  }

  handleClick(e) {
    e.preventDefault()
    // checking login credentials
    const { email, name, password, passwordConf } = this.state
    const body = { email, name, password, passwordConf }
    if(email.length >= 1) {
      if(name.length >= 1) {
        if(password.length >= 1) {
          if(passwordConf.length >= 1) {
            socket.emit('Register', body)
          } else {
            this.setState({ registerFail: true, registerMsg: 'Password Confirmation is required' })
          }
        } else {
          this.setState({ registerFail: true, registerMsg: 'Password is required' })
        }
      } else {
        this.setState({ registerFail: true, registerMsg: 'Nickname is required' })
      }
    } else {
      this.setState({ registerFail: true, registerMsg: 'Email is required' })
    }
  }

  render() {
    return (
      <div className="authContainer">
        <h1>CAH</h1>
        { this.state.redirect && <Redirect to="/" /> }
        <div className="signup">
          <h2>Join Today</h2>
          <form onSubmit={e => this.handleClick(e)}>
          {this.state.registerFail && <div className="loginFail"><span>{this.state.registerMsg}</span></div>}
            <input type="text" name="name" placeholder="Nickname" onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
            <input type="text" name="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
            <input type="password" name="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
            <input type="password" name="passwordConf" placeholder="Password Confirmation" onChange={e => this.setState({ passwordConf: e.target.value })} value={this.state.passwordConf} />
            <button type="submit" name="register">Register</button>
          </form>
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
