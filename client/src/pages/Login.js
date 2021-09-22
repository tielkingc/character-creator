import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
    const [formState, setFormState] = useState({ username: '', password: ''});
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async event => {
        event.preventDefault();

        try{
            const mutationResponse = await login({
                variables: { username: formState.username, password: formState.password}
            });

            const token = mutationResponse.data.login.token;

            Auth.login(token);
        } catch (evt) {
            console.group(evt);
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return(
        <div className="container-fluid pt-4 bg-secondary bg-opacity-25 p-5 vh-100">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2 col-6">
                    <label htmlFor="username">Username:</label>
                    <input className="form-control input-md shadow"
                        placeholder="Your Username"
                        name="username"
                        type="username"
                        id="username"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2 col-6">
                    <label className="col control-label" htmlFor="pwd">Passwords:</label>
                    <input className="form-control input-md shadow"
                        placeholder="********"
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                </div>
                {
                    error ? <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                    </div>: null
                }
                <div className="flex-row space-between my-2 mx-auto">
                    <button className="btn btn-danger" type="submit">Sign In</button>
                
                </div>
            </form>
        </div>
    )
}

export default Login;