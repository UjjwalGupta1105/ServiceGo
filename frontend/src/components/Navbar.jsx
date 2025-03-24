// import axios from "axios"
import img from "../assets/logo2.jpg"
import { useEffect, useState,useContext } from "react"
import { Link } from "react-router-dom"
import UseOptions from "./UseOptions"
import { AppContext } from "../context/AppContext"

const Header=()=>{
    const [User,setUser]=useState()
    const {auth,user,isAuthenticated}=useContext(AppContext)


    useEffect(()=>{
        async function check(){
             const data=await auth()
            if(data?.sucess){
                setUser(data?.user)
            }
        }
        check()
    },[])
    
    return(
        <>
            <div className="header">
                <div className="first">
                    <img src={img} alt="logo." />
                    <h2>Service Go</h2>
                </div>
                <div className="mid">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Services/all-services">Services</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                 <div className="second">
                  { isAuthenticated ? <UseOptions/>
                 :
                 <Link to="/register">Signup/Login</Link>
                  } 
                  
                </div>
             </div> 
        </>
    )
}

export default Header