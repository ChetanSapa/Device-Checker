import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {DatabaseContext} from "../context/dataBase/databaseContext";


export const Navbar = () => {
    let {authData, logout} = useContext(DatabaseContext)
    return (
        <nav className={'navbar justify-content-between navbar-dark navbar-expand-lg bg-success'}>
            <div className="navbar-brand m-lg-3">
                <div className={'logo'}>
                    <h2>&</h2> &nbsp; DeviceChecker
                </div>
            </div>
            {authData.token ?
                <div className="d-flex m-4">
                    <div className={'nav-buttons'}>
                        <span className={'logo-auth'}>{authData.login}</span>
                        {authData.type === 'admin' ?
                            <NavLink className="btn btn-light  me-3" to={'/create-device'}>Create device</NavLink>
                            : <></>}
                        <button
                            type="button"
                            className="btn btn-light button "
                            onClick={logout}
                        >Logout
                        </button>
                    </div>
                </div> : <></>
            }
        </nav>
    )
}