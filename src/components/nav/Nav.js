import React from "react"
import { Link } from "react-router-dom"
import "./Nav.css"

export const NavBar = (props) => {
    return (
            <>
            <div className="dropdown">
                <i className="fa fa-bars" aria-hidden="true"></i>
                <div className="dropdown-content">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/">My Readings</Link>
                        <Link className="nav-link" to="/reading">Get A Reading</Link>
                        <div className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("ar_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</div>
                </div>
            </div>
            </> 
            
    )
}
