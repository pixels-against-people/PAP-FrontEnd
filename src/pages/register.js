/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react'
import './login.css'
import { Link, Redirect } from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConf: '',
      redirect: false,
    }
  }

  handleClick() {
    // checking login credentials
    const { email, password, passwordConf } = this.state
    const body = { email, password, passwordConf }

    fetch('https://cards-against-humanity-api.herokuapp.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          // will activate the redirect component, sending user to the next page when the page renders
          this.setState({ redirect: true })
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  render() {
    return (
      <div className="authContainer">
        <h1>CAH</h1>
        { this.state.redirect && <Redirect to="/" /> }
        <div className="signup">
          <h2>Join Today</h2>
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
