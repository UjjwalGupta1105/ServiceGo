import { useState, useEffect, useContext, useRef } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Slidebar from "./ProSlidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import ProNav from "./ProNav";
import { toast } from "react-toastify";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from "../../components/Loading";

const Bookings = () => {
  const navigate = useNavigate();
  const { all_bookings } = useContext(AdminContext);
  const { cancelBooking, auth,MarkBookingDone } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [professional, setProfessional] = useState({});
  const [loading, setLoading] = useState(true);
  
  // const isMounted = useRef(true); 

  useEffect(() => {
    const getProfessional = async () => {
      const response = await auth();
      console.log(response)
        setProfessional(response.user);
    };

    getProfessional();
  }, []);

  const getData = async () => {
    const response = await all_bookings();
    console.log(response.reverse())
    const ProfessionalsBookings = response.filter(
      (booking) => booking.professionalId === professional._id
    );
    console.log(ProfessionalsBookings)

      setBookings(ProfessionalsBookings);
      setLoading(false)
  };

  useEffect(() => {
    getData();
  }, [professional]);


  const CancelBooking = async (id) => {
    const booking=bookings.find((booking)=>booking._id===id)
    console.log(booking)
    if(booking?.isCompleted){
      toast.error("Can't Cancel Completed Bookings")
      return;
    }
    if(booking?.cancelled){
      toast.error("Booking already Cancelled")
      return;
    }
    setLoading(true)
    await cancelBooking(id);
    getData()
  };
  const MarkBookingCompleted = async (id) => {
    const booking=bookings.find((booking)=>booking._id===id)
    console.log(booking)
    if(booking?.isCompleted){
      toast.error("Service already Completed")
      return;
    }
    if(booking?.cancelled){
      toast.error("Service is Cancelled")
      return;
    }
    setLoading(true)
    const response=await MarkBookingDone(id)
    if(response.success){
      toast.success(response.message)
      getData()
    }
    // await cancelBooking(id);
  };

  const ViewUser=async(id)=>{
    navigate(`/bookings/user/${id}`)
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
    { field: "address", headerName: "Address", width: 240 },
    { field: "dateTime", headerName: "Date & Time", width: 180 },
    { field: "amount", headerName: "Amount", width: 145 },
    { field: "status", headerName: "Status", width: 155 },
    {
      field: "actions",
      headerName: "Actions",
      width: 225,
      renderCell: (params) => (
        <>
          <Button style={{borderRadius:"10px",color:"blue"}} title="View User Details" onClick={()=>ViewUser(params.row.userId)}>
            <VisibilityIcon  />
          </Button>
          <Button style={{borderRadius:"10px",color:"red"}} title="Cancel Booking" onClick={() => CancelBooking(params.row.id)}>
            <CancelIcon  />
          </Button>
          <Button style={{borderRadius:"10px",color:"green"}} title="Mark as Completed" onClick={() => MarkBookingCompleted(params.row.id)}>
            <DoneIcon/>
          </Button>
        </>
      ),
    },
  ];

  const rows = bookings.map((booking) => ({
    id: booking._id,
    userId: booking.userId,
    customer: {
      name: booking.userData.name,
      image: booking.userData.image || "",
    },
    address:` ${booking.appointmentData?.address} , ${booking.appointmentData?.city} ,${ booking.appointmentData?.state},${booking.appointmentData?.pincode}`,
    dateTime: `${booking.slotDate}, ${booking.slotTime}`,
    amount: `₹ ${booking.amount}`,
    status: booking.isCompleted
      ? "Completed"
      : booking.cancelled
      ? "Cancelled"
      : "Pending",
  }));

  return (
    <div className="pro-dashboard-page">
    {loading && <Loader/>}
    <ProNav/>
      <div className="admin-bookings-page">
        <Slidebar />
        <div className="admit-products-list">
          <div style={{ height: "94%", width: "90%", margin: "20px auto" }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
