import Slidebar from "./Slidebar"
import { AdminContext } from "../../context/AdminContext"
import { AppContext } from "../../context/AppContext"
import { useContext, useState } from "react"
import {toast} from "react-toastify"
import {useNavigate} from 'react-router-dom'
// import { getAdminProducts ,clearErrors,deleteProduct} from '../../actions/productAction'
import { useParams } from 'react-router-dom'
// import MetaData from '../../layout/MetaData'
import {Link} from 'react-router-dom'
// import Loading from '../../layout/Loading'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'
import { Avatar, Box } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from "../../components/Loading";

const Users=()=>{
    const navigate=useNavigate()
    const {getAllUsers}=useContext(AdminContext)
    const {cancelBooking,deleteCancelledBooking}=useContext(AppContext)
    const [users,setUsers]=useState([])
         const [loading, setLoading] = useState(true);

    const getData=async()=>{
        const response=await getAllUsers()
        setUsers(response?.reverse())
        console.log(response)
        setLoading(false)
    }

    useState(()=>{
        getData()
    },[])

    const ViewUser=async(id)=>{
       navigate(`/admin/users/${id}`)
    }
    const DeleteUser=async(id)=>{
      // const response=await deleteCancelledBooking(id)
      // getData()
    }

    const columns = [
      { field: "userId", headerName: "UserId", width: 250 },  ,
        {
          field: "user",
          headerName: "User",
          width: 200,
          renderCell: (params) => (
            <Box display="flex" alignItems="center">
              <Avatar src={params.row.user.image} alt={params.row.user.name} sx={{ marginRight: 1 }} />
              {params.row.user.name}
            </Box>
          ),
        },
        { field: "email", headerName: "Email", width: 264 },      
        { field: "city", headerName: "City", width: 150 },
        { field: "pinCode", headerName: "PinCode", width: 110 },
        {filed:"actions",headerName:"Actions", width: 175,
          renderCell:(params)=>{
              return(
                  <>
                   <Button 
                  onClick={()=>ViewUser(params.api.getCellValue(params.id,"id"))} title="View User"><VisibilityIcon/></Button>
                  <Button 
                  onClick={()=>DeleteUser(params.api.getCellValue(params.id,"id"))} title="Delete User"><DeleteIcon/></Button>
                  </>
              )
          }
        }
      ];
    
      const rows = users.map((user, index) => ({
        id:user._id,
        userId: user._id,
        user: {
          name: user.name,
          image: user.image, // Placeholder if no image
        },
        email:user.email,
        city: user.city, // Placeholder
        pinCode:user.additionalInfo?.pincode,
      }));
    


    return(
        <>
            {loading && <Loader/>}
            <div className="admin-bookings-page">
                <Slidebar/>
                <div className="admit-products-list">
                    <div style={{height:"97%", width: "93%",margin:"20px auto" ,backgroundColor:"white"}}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
                </div>
            </div>
        </>
    )
}

export default Users
