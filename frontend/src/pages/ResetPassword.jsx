import React , {useState,useRef, useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Loading from '../components/Loading'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {AppContext} from '../context/AppContext'

const ResetPassword=()=>{
    // const {loading,error,success}=useSelector((state)=>state.forgotPassword)

    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const {token}=useParams()
    const {resetPassword}=useContext(AppContext)
    const navigate=useNavigate()

    useEffect(()=>{
   
        // if(success){
        //     alert.success("Password Updated Successfully")
        //     navigate("/login")
        // }
    },[])

    const updateSubmit=async(e)=>{
        e.preventDefault()
        setLoading
        const response=await resetPassword(token,password,confirmPassword)
        setLoading(false)
        setPassword("")
        setConfirmPassword("")
        if(response?.success){
            navigate("/register")
        }
     }

    return(
        <>
             {loading ? <Loading/> :
            <>
        <div className="reset-password-page">

            <div className="reset-password-container">
                <h2>Update Password</h2>

                <form  className="reset-password-form" onSubmit={updateSubmit}>
                    <div className="reset-password">
                    <div><LockOpenIcon/></div>
                        <input type="password" placeholder='New Password' className='form-inputs' required value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="reset-confirm-password">
                    <div><LockOpenIcon/></div>
                        <input type="password" placeholder='Confirm New Password' className='form-inputs' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Update Password" className='reset-password-button'/>
                </form>

            </div>
        </div>    
            </>
        }  
        </>
    )
}

export default ResetPassword