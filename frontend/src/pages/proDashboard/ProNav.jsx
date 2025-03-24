import { useEffect,useContext } from "react"
import { AppContext } from "../../context/AppContext"
import img from "../../assets/logo2.jpg"
import { useNavigate } from "react-router-dom"

const ProNav=()=>{
     const {professionalLogOut,auth,CheckPerson}=useContext(AppContext)
     const navigate=useNavigate()

     const handelProLogOut=async()=>{
        console.log("WantsLogOut....")
        const response=await professionalLogOut()
        if(response){
            await CheckPerson()
            navigate("/register")
        }
     }

    return <>
        <navbar>
                    <div className="header">
                        <div className="first">
                            <img src={img} alt="logo." />
                            <h2>Service Go</h2>
                        </div>
                        <div className="mid">
                            <ul>
                                
                            </ul>
                        </div>
                         <div className="second">
                            <button className='logOut-button' onClick={handelProLogOut}>LogOut</button>   
                        </div>
                     </div> 
        </navbar>
    </>
}



export default ProNav