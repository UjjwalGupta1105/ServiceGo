import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import img from "../assets/logo2.jpg"
import {useNavigate} from 'react-router-dom'

const ProfessionalsCard = ({ serviceman }) => {
  const navigate=useNavigate()
  return (
    <div className="service-card">
      {/* Profile Image */}
      <div className="service-card-image">
        {/* <img src={serviceman.image} alt={serviceman.name} /> */}
        <img src={serviceman.image} alt={serviceman.name} style={{margin:"auto",borderRadius:"12px",width:"120%"}} />

        <span
          className={`availability ${serviceman.available ? "available" : "unavailable"}`}
        >
          {serviceman.available ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Details Section */}
      <div className="service-card-content">
        <h3>{serviceman.name}</h3>
        <p className="category">{serviceman.service}</p>

        {/* Rating */}
        <div className="rating">
          <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={serviceman?.rating} precision={0.5} readOnly />
          </Stack>
          <span>({serviceman.rating || "New"})</span>
        </div>

        {/* Pricing */}
        <div className="price">
          ₹
          <span>{serviceman.fees} / service</span>
        </div>

        {/* Contact Button */}
        
        <button onClick={()=>navigate(`/book/${serviceman._id}`)} className="contact-btn">
           Book Now
        </button>
      </div>
    </div>
  );
};

export default ProfessionalsCard;
