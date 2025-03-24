import {useState,useContext} from 'react'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import axios from "axios"
import { AppContext } from '../context/AppContext';

const useOptions=()=>{

    // const alert=useAlert()
    const [open,setOpen]=useState(false)
    const navigate=useNavigate()
    const {userLogOut}=useContext(AppContext)

    const logout=async()=>{
        const response=await userLogOut()
        if(response){
            navigate("/register")
        }
    }


    const actions=[
        {icon :<ListAltIcon/> , name:"My Bookings",func:Bookings},
        {icon :<PersonIcon/> , name:"Profile",func:account},
        {icon :<LogoutIcon/> , name:"Logout",func:logoutUser},
        {icon :<DashboardIcon/> , name:"Admin's Dashboard",func:AdminFunctionalities},



    ]
    function Bookings(){
        navigate("/my-bookings")
    }
    function account(){
        navigate("/my-profile")
    }
    async function logoutUser(){
         await logout()
        //  window.location.reload(true);
        // navigate("/register")
        alert.success("Logged Out Successfully...")
    }
    function AdminFunctionalities(){
       navigate("/admin/dashboard")
   }

    return(
        <>
        <Backdrop open={open}/>
        <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        icon={<PersonIcon/>}
        direction="down"
        className='speedDial'
>
         {actions.map((action) => (
             <SpeedDialAction
             key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen={window.innerWidth<=600?true:false}
              onClick={action.func}
            />
))}
     </SpeedDial>
        </>
    )
}

export default useOptions