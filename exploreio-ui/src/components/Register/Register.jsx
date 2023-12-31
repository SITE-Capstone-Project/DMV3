import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { register, logIn, fixToken } from "../../utilities/apiClient"
import registrationpage from "../../assets/registration-page.jpg"
import "./Register.css"
import Footer from "../Footer/Footer"

export default function Register({ setAppState, setLoggedIn, isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    agreeToTerms: false,
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsLoading(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    try {
      // Setting up appropriate credentials
      const body = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        username: form.username,
        password: form.password,
      }

      // Register
      const res = await register(body)

      // Now, attempt to log in after registering is complete
      if (res?.username) {
        const loginBody = {
          email: form.email,
          password: form.password,
        }

        try {
          const logInRes = await logIn(loginBody)

          if (logInRes) {
            window.location.replace("/")
            localStorage.setItem("exploreio-token", fixToken(logInRes?.token))
            setAppState(logInRes?.user)
            setLoggedIn(true)
          }

        } catch (error) {
          setErrors((e) => ({ ...e, form: "Error Logging In" }))
        }

        setIsLoading(false)
      } else {
        setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <div> <h1 className = "not-logged"> You're already logged in. </h1></div>
       ) : (
        <div>
          <img id="register-background" src={registrationpage}/>
        <div>
        <div className="Register">

          <div className="registercard">
            <h2>Get Started!</h2>

            {errors.form && <span className="error">{errors.form}</span>}

            <div className="form">
              <br />

              <div className="split-inputs">
                <div className="input-field">
                  <label htmlFor="name">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleOnInputChange}
                  />
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div className="input-field">
                  <label htmlFor="name">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleOnInputChange}
                  />
                  {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleOnInputChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="input-field">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleOnInputChange}
                />
                {errors.username && <span className="error">{errors.username}</span>}
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleOnInputChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="input-field">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  value={form.passwordConfirm}
                  onChange={handleOnInputChange}
                />
                {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
              </div>

              <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
                {isLoading ? "Loading..." : "Create Account"}
              </button>
            </div>

            <div className="footer">
              <p>
                Already have an account? Login <Link to="/login">here</Link>
              </p>
            </div>
          </div>
        </div>
        <Footer/>
        </div>
        </div>
      )}
    </div>
  )
}