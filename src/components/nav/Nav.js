import React from "react"
import { Link } from "react-router-dom"
import "./Nav.css"

export const NavBar = (props) => {
    return (
            <>
            <div className="dropdown">
                <i class="fa fa-bars" aria-hidden="true"></i>
                <div className="dropdown-content">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/">My Readings</Link>
                        <Link className="nav-link" to="/">Get A Reading</Link>
                        <Link className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("ar_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</Link>
                </div>
            </div>
            </> 
            
    )
}
