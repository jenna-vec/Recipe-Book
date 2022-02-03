import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { getAuth, updateProfile, sendPasswordResetEmail, deleteUser } from "firebase/auth";

export default function Account({ user }) {

    const [name, setName] = useState("");

    const auth = getAuth();
    const userAuth = auth.currentUser;
    var userName = "";
    if (userAuth !== null){
        userName = user.displayName
    }

    var userEmail = user.email;

    const confirmDelete = () => {
        document.getElementById("delete-button").style.display = "none";
        document.getElementById("confirm-delete").style.display = "block";
      }
    
    const sendEmail = () => {
        document.getElementById("pC").style.display = "none";
        document.getElementById("password-change").style.display = "block";
    }

    const changeName = () => {
        document.getElementById("cN").style.display = "none";
        document.getElementById("change-name").style.display = "flex";
    }

    const updateName = (e) => {
        e.preventDefault();
        const auth = getAuth();
        updateProfile(auth.currentUser, { displayName: name }).then(() => {
            document.getElementById("cN").style.display = "block";
            document.getElementById("change-name").style.display = "none";
        }).catch(() => {
        alert("Error: Please sign out and retry.")
        })
    }

    const nevermind = () => {
        document.getElementById("delete-button").style.display = "block";
        document.getElementById("confirm-delete").style.display = "none";
      }

    const deleteForever = (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            console.log("Deleted")
        }).catch((error) => {
            alert(error.code);
        });
    }

    const updatePassword = (e) => {
        e.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            document.getElementById("pC").style.display = "block";
            document.getElementById("password-change").style.display = "none";
        })
        .catch((error) => {
            console.log(error.code)
            alert("Error: Please sign out and retry")
        });
    }

    return (
        <div className='child'>
            <div className='main-flex'>
                <div className='card fit-content'>
                    <h3 className='petit-cap center'>Profile</h3>
                    <div className='vertical-flex account-flex'>
                        <div className='account'>
                            <h4 className='petit-cap'>Name</h4>
                            <span>{userName}</span>
                            <EditIcon id="cN" onClick={changeName} sx={{ cursor: "pointer" }} fontSize="small" color='primary' />
                            <div id='change-name' className='account-change'>
                                <TextField
                                    id="name"
                                    size="small"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <ArrowCircleRightIcon onClick={updateName} color='primary'/>
                            </div>
                        </div>
                        <div className='account'>
                            <h4 className='petit-cap'>Email Address</h4>
                            <span>{user.email}</span>
                        </div>
                        <div className='account'>
                            <h4 className='petit-cap'>Password</h4>
                            <EditIcon id="pC" onClick={sendEmail} sx={{ cursor: "pointer" }} fontSize="small" color='primary' />
                            <Button onClick={updatePassword} id="password-change" size='small' variant='contained' color='primary'>Send password reset email</Button>
                        </div>
                        <Button id="delete-button" onClick={confirmDelete} sx={{ width: "fit-content", alignSelf: "center" }} size="small" variant="outlined" color="error">
                            Delete Account
                        </Button>
                        <div className='vertical-flex' id='confirm-delete'>
                            <p>Are you sure you want to delete you account?</p>
                            <div className='dash-card'>
                                <Button onClick={deleteForever} sx={{ width: "fit-content", alignSelf: "center" }} size="small" variant="contained" color="error">
                                    Confirm Deletion
                                </Button>
                                <Button onClick={nevermind} sx={{ width: "fit-content", alignSelf: "center" }} size="small" variant="contained" color="success">
                                    Nevermind
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
