import { useState } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  onLogin: PropTypes.func.isRequired
}

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  LoginForm.propTypes = propTypes

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password)
  }
  return (
    <>
      <h2>Login to Application</h2>
      <form onSubmit={handleSubmit}>
        <p>Username<input id='login-username' required onChange={(e) => setUsername(e.target.value)}/></p>
        <p>Password<input id='login-password' required type='password' onChange={(e) => setPassword(e.target.value)}/></p>
        <button id='login-button' >Login</button>
      </form>
    </>
  )
}

export default LoginForm
