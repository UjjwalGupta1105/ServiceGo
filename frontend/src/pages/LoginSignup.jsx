import React , {useState,useRef, useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'; 
import { AppContext } from '../context/AppContext';
import Loader from "../components/Loading";

const LoginSignup=()=>{
    const navigate=useNavigate()
    const {userRegister,CheckPerson}=useContext(AppContext)
    const {userLogin}=useContext(AppContext)
     const [loading, setLoading] = useState(false);

    const [loginEmail,setLoginEmail]=useState("");
    const [loginPass,setLoginPass]=useState("")

    const loginTab=useRef(null)
    const signupTab=useRef(null)
    const switcherTab=useRef(null)


    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        city:""
    })

    const loginSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        
        const response=await userLogin({
            email:loginEmail,
            password:loginPass,
        })
        setLoading(false)
       if(response){
           navigate("/")
       }
    }
    const signupSubmit=async(e)=>{
       e.preventDefault()
       setLoading(true)
       const response=await userRegister(user)
       setLoading(false)
       if(response){
           navigate("/")
       }
    }

    const registerDataChange=(e)=>{
            setUser({...user,[e.target.name]:e.target.value})

    }

    const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab?.current.classList.add("shiftToNeutral")
            switcherTab?.current.classList.remove("shiftToRight")

            signupTab?.current.classList.remove("shiftToNeutral")
            loginTab?.current.classList.remove("shiftToLeft")
        }
        if(tab==="signup"){
            switcherTab?.current.classList.add("shiftToRight")
            switcherTab?.current.classList.remove("shiftToNeutral")

            signupTab?.current.classList.add("shiftToNeutral")
            loginTab?.current.classList.add("shiftToLeft")
        }
    }

    useEffect(()=>{
        const check=async()=>{
            await CheckPerson()
        }
        check()
    },[])

    return(
        <>
        {
            <>
        <div className="login-signup-page">

            <div className="login-signup-container">
                <div className="login-signup-box">
                    <div className="login-signup-switch">
                        <p onClick={(e)=>switchTabs(e,"login")}>Login</p>
                        <p onClick={(e)=>switchTabs(e,"signup")}>Signup</p>
                    </div>
                    <button  className='shiftToNeutral' ref={switcherTab}></button>
                </div>

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
                    <p onClick={()=>navigate("/login/professional")}>Login as a Professional ?</p>
                </form>

            <form action="" className="signinForm"  ref={signupTab} encType="multipart/form-data" onSubmit={signupSubmit} >
                <div className="signup-name">
                    <div><PersonIcon/></div>
                    <input type="text" placeholder='Name'  className='form-inputs' name="name" required value={user.name} onChange={(e)=>registerDataChange(e)} />
                </div>
                <div className="signup-name">
                    <div><LocationOnIcon/></div>
                    <input type="text" placeholder='City (District)'  className='form-inputs' name="city" required value={user.city} onChange={(e)=>registerDataChange(e)} />
                </div>
                <div className="signup-email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Email' className='form-inputs' name="email" required value={user.email} onChange={(e)=>registerDataChange(e)} />
                </div>
                <div className="signup-pass">
                        <div><LockOpenIcon/></div>
                        <input type="password" placeholder='Password'  className='form-inputs' name="password" required value={user.password} onChange={(e)=>registerDataChange(e)}/>
                </div>
                <input type="submit" value="Signup" className='signup-Button' />
                </form>
            </div>
        </div>    

            </>
        }
        </>
    )
}
export default LoginSignup 