import React , {useState,useRef, useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Loading from '../components/Loading'
// import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {AppContext} from '../context/AppContext'

const ForgotPassword=()=>{
    // const {loading,error,message}=useSelector((state)=>state.forgotPassword)
    const {forgotPassword}=useContext(AppContext)

    const [email,setEmail]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
   
    },[])

    const updateSubmit=async(e)=>{
        e.preventDefault()
        window.scrollTo(0,0)
        setLoading(true)
        // setLoading(true)
        const response=await forgotPassword(email)
        setEmail("")
        setLoading(false)
     }

    return(
        <>
             {loading ? <Loading/> :
            <>
        <div className="forgot-password-page">

            <div className="forgot-password-container">
                <h2>Update Password</h2>

                <form  className="forgot-password-form" onSubmit={updateSubmit}>
                    <div className="forgot-password-email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Enter your Email....' className='form-inputs' required value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <input type="submit" value="Send Email" className='forgot-password-button'/>
                    <p className='heading-check'>Also Check your Spam folder !!</p>
                </form>

            </div>
        </div>    
            </>
        }  
        </>
    )
}

export default ForgotPassword