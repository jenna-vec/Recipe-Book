import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { auth } from "../../firebase";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email.trim(), password)
        .then((userCredential) => {
            navigate("/");
        })
        .catch((error) => {
            console.log(error.code)
            console.log(error.message)
            alert("Error: " + error.message)
        });
    }

    return (
        <div className='child'>
            <div className='width'>
                <div className='vertical-flex'>
                    <div className='card'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-flex'>
                                <h3 className='center petit-cap'>login</h3>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button type='submit' variant="contained">LOGIN</Button>
                            </div>
                        </form>
                    </div>
                    <br />
                    <Link to="/register" className='center'>New to Recipe Book? Create your book here.</Link>
                </div>
            </div>
        </div>
    );
}


