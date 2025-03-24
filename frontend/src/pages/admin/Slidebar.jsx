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
                <NavLink className={({isActive})=>`${isActive ?'selected' : ''}`}  to="/admin/dashboard">
                  <p> <span> <DashboardIcon sx={{fontSize:"33px"}}/></span>DashBoard</p>

                </NavLink>
                {/* <Link >
                   <SimpleTreeView
                    defaultCollapseIcon ={<ExpandMoreIcon sx={{fontSize:"40px"}}/>}
                    defaultExpandIcon ={<ImportExportIcon sx={{fontSize:"40px"}}/>}
                    className="tree-item"
                   >
                    <TreeItem itemId="1" label="Products" sx={{fontSize:"40px"}}>
                        <Link to="/admin/products">
                            <TreeItem itemId="2" label="All" icon={<PostAddIcon sx={{fontSize:"40px"}}/>}/>
                       </Link>
                        <Link to="/admin/product/new">
                            <TreeItem itemId="3" label="Create" icon={<AddIcon sx={{fontSize:"40px"}}/>} />
                        </Link>
            
                    </TreeItem>

                   </SimpleTreeView>
                </Link> */}
                <NavLink className={({isActive})=>`${isActive ? 'selected' : ' '}`} to="/admin/bookings">
                    <p>
                    <span><ListAltIcon sx={{fontSize:"33px"}}/></span>
                        Bookings
                    </p>
                </NavLink>
                <NavLink className={({isActive})=>`${isActive ?'selected' : ' '}`} to="/admin/professionals/all-services">
                    <p>
                    <span><ListAltIcon sx={{fontSize:"33px"}}/></span>
                        Professionals
                    </p>
                </NavLink>
                <NavLink className={({isActive})=>`${isActive ?'selected' : ''}`} to="/admin/add-professional">
                    <p>
                    <span><RateReviewIcon sx={{fontSize:"33px"}}/></span>
                       
                        Add Professional
                    </p>
                </NavLink>
                <NavLink className={({isActive})=>`${isActive ?'selected' : ''}`} to="/admin/users">
                    <p>
                    <span><ListAltIcon sx={{fontSize:"33px"}}/></span>
                        Users
                    </p>
                </NavLink>
                <NavLink className={({isActive})=>`${isActive ?'selected' : ''}`} to="/admin/newRequests">
                    <p>
                    <span><ListAltIcon sx={{fontSize:"33px"}}/></span>
                        New Requests
                    </p>
                </NavLink>
            </div>
        </>
    )
}

export default Slidebar