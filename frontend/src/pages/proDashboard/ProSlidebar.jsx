import React from 'react'
import {Link, NavLink} from "react-router-dom"
// import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
// import { TreeItem } from '@mui/x-tree-view/TreeItem';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import AddIcon from '@mui/icons-material/Add';
// import ImportExportIcon from '@mui/icons-material/ImportExport';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Slidebar=()=>{
    return(
        <>
            <div className="slidebar"> 
                <NavLink className={({isActive})=>`${isActive ?'selected' : ''}`}  to="/">
                  <p> <span> <DashboardIcon sx={{fontSize:"33px"}}/></span>DashBoard</p>

                </NavLink>
                <NavLink className={({isActive})=>`${isActive ? 'selected' : ' '}`} to="/bookings">
                    <p>
                    <span><ListAltIcon sx={{fontSize:"33px"}}/></span>
                        Bookings
                    </p>
                </NavLink>
                <NavLink className={({isActive})=>`${isActive ?'selected' : ' '}`} to="/profile">
                    <p>
                    <span><ListAltIcon sx={{fontSize:"33px"}}/></span>
                        Profile
                    </p>
                </NavLink>
            </div>
        </>
    )
}

export default Slidebar