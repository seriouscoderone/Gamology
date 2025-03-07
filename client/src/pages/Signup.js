import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import Auth from '../utils/auth'
import { ADD_USER } from '../utils/mutations'

function Signup (props) {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' })
  const [addUser, { error }] = useMutation(ADD_USER)
  console.log(error)
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const mutationResponse = await addUser({
      variables: {
        username: userFormData.username,
        email: userFormData.email,
        password: userFormData.password
      }
    })
    const token = mutationResponse.data.addUser.token

    Auth.login(token)
  }
  const change = (event) => {
    const { name, value } = event.target

    setUserFormData({
      ...userFormData,
      [name]: value
    })
  }

  return (
        <div className="form-container">
            <h2 className="form-header">Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" name="username" type="new-username" onBlur={change}/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="new-email" onBlur={change}/>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="new-password" onBlur={change}/>
                </div>

                <button type="submit">Submit</button>
            </form>
            <Link to="/login">Actually Lets Login Instead</Link>
        </div>
  )
}

export default Signup
