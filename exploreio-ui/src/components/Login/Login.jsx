import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { logIn, fixToken } from "../../utilities/apiClient"
import loginpage from "../../assets/login-page.jpg"
import "./Login.css"
import Footer from "../Footer/Footer"

export default function Login({ setAppState, setLoggedIn, isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    try {
      const res = await logIn(form)
      if (res?.user) {
        setAppState(res?.user)
        localStorage.setItem("exploreio-token", fixToken(res?.token))
        setIsLoading(false)
        window.location.replace("/")
        setLoggedIn(true)
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
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
      ): (
        <div>
        <div className="Login">
          <img id="login-background" src={loginpage}/>
  
          <div className="logincard">
            <h1>Welcome</h1>
  
            {Boolean(errors.form) && <span className="error">{errors.form}</span>}
  
            <div className="form">
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="user@gmail.com"
                  value={form.email}
                  onChange={handleOnInputChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
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
  
              <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
  
            <div className="footer">
              <p>
                New to Us? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
          <Footer/>
        </div>
      )}
    </div>
  )
}