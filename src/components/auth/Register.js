import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

export const Register = (props) => {
    const firstName = React.createRef()
    const lastName = React.createRef()
    const email = React.createRef()
    const bio = React.createRef()
    const password = React.createRef()
    const verifyPassword = React.createRef()
    const passwordDialog = React.createRef()
    const sign = React.createRef()

    const [ signs, setSigns ] = useState([])

    const getSigns = () => {
        return fetch("http://localhost:8000/signs", {
        })
            .then(response => response.json())
            .then(setSigns)
    }

    useEffect(() => {
        getSigns()
    },[])

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "astrology_id": sign.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("ar_token", res.token)
                        props.history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
            <div className="container--login">
                <div className="login-div">

                    <dialog className="dialog dialog--password" ref={passwordDialog}>
                        <div>Passwords do not match</div>
                        <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
                    </dialog>

                    <form className="form--login" onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                        <fieldset>
                            <label htmlFor="firstName"> First Name </label>
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="lastName"> Last Name </label>
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="verifyPassword"> Verify Password </label>
                            <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="verifyPassword"> Bio </label>
                            <textarea ref={bio} name="bio" className="form-control" placeholder="Let other users know a little bit about you..." />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="sign">Your Astrological Sign </label>
                            <select defaultValue="" name="sign" ref={sign} id="signs" className="form-control" >
                                {signs.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>    
                        </fieldset>
                        <fieldset style={{
                            textAlign: "center"
                        }}>
                            <button className="signIn-btn" type="submit">Register</button>
                        </fieldset>
                    </form>
                    <section className="link--register">
                        Already registered? <Link to="/login">Login</Link>
                    </section>
                </div>
            </div>
        </main>
    )
}
