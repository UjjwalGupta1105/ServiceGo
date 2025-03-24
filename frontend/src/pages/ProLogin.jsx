import React , {useState,useRef, useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'; 
import { AppContext } from '../context/AppContext';


const ProLogin=()=>{
    const navigate=useNavigate()
    const {professionalLogin,CheckPerson}=useContext(AppContext)

    const [loginEmail,setLoginEmail]=useState("");
    const [loginPass,setLoginPass]=useState("")

    const loginTab=useRef(null)

    const loginSubmit=async(e)=>{
        e.preventDefault()
        
       const user={
            email:loginEmail,
            password:loginPass,
        }

        const response=await professionalLogin(user)
       if(response){
           await CheckPerson()
           navigate("/")
       }
    }

    return(
        <>
        {
            <>
        <div className="login-signup-page">

            <div className="login-signup-container proLogin-container">

                <h3>Professional Login</h3>

                <form  className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className="login-Email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Email' className='form-inputs' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
                    </div>
                    <div className="login-Pass">
                        <div><LockOpenIcon/></div>
                        <input type="password" placeholder='Password'  className='form-inputs' required value={loginPass} onChange={(e)=>setLoginPass(e.target.value)} />
                    </div>
                    <div className='Forgot-Pass'><Link to="/password/forgot">Forgot Password ?</Link></div>
                    
                    <input type="submit" value="Login" className='login-Button'/>
                    <p onClick={()=>navigate("/register")}>Login as a User ?</p>
                </form>
            </div>
        </div>    

            </>
        }
        </>
    )
}
export default ProLogin 