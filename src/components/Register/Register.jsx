import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailHelp, setEmailHelp] = useState("");
    const [passwordHelp, setPasswordHelp] = useState("");
    const [checkmark, setCheckmark] = useState(true);
    const [completed, setCompleted] = useState(false);

    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    // Testing and Regex
    var regexEmail = /\S+@\S+\.\S+/
    var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    let Confirmation = () => {
        return (
            <div className='form-flex'>
                <h4>Registration Successful!</h4>
                <p>Your account confirmation was sent to {email} .</p>
                <Link to="/">Open your recipe book.</Link>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( regexEmail.test(email) === false) {
            setEmailHelp("Please enter a valid email")
        }
        else if ( regexPassword.test(password) === false ) {
            setPasswordHelp("Please use at least 8 characters: include one letter and one number.")
        }
        else {
            if( checkmark === true ) {
                setDoc(doc(db, "subscribed", email), {
                    date: date
                  });
            }
            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              setCompleted(true);
            }).catch((error) => {
                Confirmation = () => (
                    <div className='form-flex'>
                      <h4>Error: {error}</h4>
                      <p>Something went wrong. Please refresh and try again.</p>
                    </div>
                  );
              });
        }
    }

    const handleClick = () => {
        var checkBox = document.getElementById("check");
        if (checkBox.checked === true){
          setCheckmark(true);
        } else {
           setCheckmark(false);
        }
      }

    return (
        <div className='register'>
            <div className='width'>
                <div className='vertical-flex'>
                    <div className='card'>
                        {completed === true ? <Confirmation /> : 
                            <form onSubmit={handleSubmit}>
                                <div className='form-flex'>
                                    <h3 className='center petit-cap'>sign-up</h3>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        helperText={emailHelp}
                                    />
                                    <TextField
                                        required
                                        id="outlined-password-input"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        helperText={passwordHelp}
                                        onChangeCapture={(e) => setPassword(e.target.value)}
                                    />
                                    <FormControlLabel control={<Checkbox id='check' onChange={handleClick} defaultChecked />} label="Subscribe to our newsletter" />
                                    <Button type='submit' variant="contained">SUBMIT</Button>
                                </div>
                            </form>
                        }
                    </div>
                    <br />
                    <Link to="/login" className='center'>Already have an account? Log in here.</Link>
                </div>
            </div>
        </div>
    );
}