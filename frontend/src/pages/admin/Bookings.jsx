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
import Loader from "../../components/Loading";

const Bookings=()=>{
    const navigate=useNavigate()
    const {all_bookings}=useContext(AdminContext)
    const {cancelBooking,deleteCancelledBooking}=useContext(AppContext)
    const [bookings,setBookings]=useState([])
       const [loading, setLoading] = useState(true);

    const getData=async()=>{
        const response=await all_bookings()
        setBookings(response.reverse())
        console.log(response)
        setLoading(false)
    }

    useState(()=>{
        getData()
    },[])

    const CancelBooking=async(id)=>{
      bookings.map(async(booking)=>{
        if(booking._id===id){
          if(booking.isCompleted){
            toast.error("Booking is already completed")
          }
          else if(booking.cancelled){
            toast.error("Booking is already cancelled")
          }
          else{
            setLoading(true)
            const response=await cancelBooking(id)
            getData()
          }
        }
      })
        // const response=await cancelBooking(id)
        // getData()
    }
    const DeleteCancelledBookings=async(id)=>{
      const response=await deleteCancelledBooking(id)
      getData()
    }

    const columns = [
        {
          field: "customer",
          headerName: "Customer",
          width: 170,
          renderCell: (params) => (
            <Box display="flex" alignItems="center">
              <Avatar src={params.row.customer.image} alt={params.row.customer.name} sx={{ marginRight: 1 }} />
              {params.row.customer.name}
            </Box>
          ),
        },
        { field: "address", headerName: "Address", width: 220 },
        { field: "dateTime", headerName: "Date & Time", width: 170 },
        {
          field: "professional",
          headerName: "Professional",
          width: 170,
          renderCell: (params) => (
            <Box display="flex" alignItems="center">
              <Avatar src={params.row.professional.image} alt={params.row.professional.name} sx={{ marginRight: 1 }} />
              {params.row.professional.name}
            </Box>
          ),
        },
        { field: "amount", headerName: "Amount", width: 135 },
        { field: "status", headerName: "Status", width: 135 },
        {filed:"actions",headerName:"Actions", width: 175,
          renderCell:(params)=>{
              return(
                  <>
                  <Button 
                  onClick={()=>CancelBooking(params.api.getCellValue(params.id,"id"))}><CancelIcon/></Button>
                  <Button 
                  onClick={()=>DeleteCancelledBookings(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
                  </>
              )
          }
        }
      ];
    
      const rows = bookings.map((booking, index) => ({
        id: booking._id,
        customer: {
          name: booking.userData.name,
          image: booking.userData.image, // Placeholder if no image
        },
        address: ` ${booking.appointmentData?.address} , ${booking.appointmentData?.city} ,${ booking.appointmentData?.state},${booking.appointmentData?.pincode}`,
        dateTime: `${booking.slotDate} , ${booking.slotTime}`,
        professional: {
          name: booking.professionalData.name, // Replace with actual professional data
          image: booking.professionalData.image, // Placeholder image
        },
        amount: '₹ '+booking.amount, // Replace with actual data if available
        status:`${booking.isCompleted ? "Completed" : booking.cancelled ? "Cancelled" : "Pending" }`,
      }));
    


    return(
        <>
         {loading && <Loader/>}

            <div className="admin-bookings-page">
                <Slidebar/>
                <div className="admit-products-list">
                    <div style={{height:"94%", width: "97%",margin:"20px auto" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
                </div>
            </div>
        </>
    )
}

export default Bookings



