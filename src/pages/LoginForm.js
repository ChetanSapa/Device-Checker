import React, {useContext, useState} from "react";
import {DatabaseContext} from "../context/dataBase/databaseContext";
import {AlertContext} from "../context/alert/alertContext";

export const LoginForm = () => {
    const {login} = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const [formData, setForm] = useState({
        login: '', password: ''
    })
    const changeHandler = (event) => {
        setForm({...formData, [event.target.name]: event.target.value})
    }
    const getAuth = (event) => {
        event.preventDefault()
        if (formData.login.trim() || formData.password.trim()) {
            login(formData)
        } else {
            alert.show('Type your email and login!', 'warning d-block' )
        }
    }
    return (
        <div className={'container col-md-6 mt-5'}>
            <form onSubmit={getAuth}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        name='login'
                        type="text"
                        className="form-control"
                        id="exampleInputLogin1"
                        aria-describedby="emailHelp"
                        onChange={changeHandler}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        name='password'
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={changeHandler}
                    />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    )
}