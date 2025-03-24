import React,{useEffect,useContext,useState} from 'react'
// import {useDispatch,useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'
// import { getProduct } from '../../actions/productAction'
// import { getOrders } from '../../actions/orderAction'
// import { getAllUsers, getUserDetails } from '../../actions/userAction'
import img from "../../assets/logo2.jpg"
import { AppContext } from "../../context/AppContext"
import Slidebar from "./ProSlidebar"
import { Calendar, Clock, Mail, MapPin, Phone, Star, Award, Briefcase } from 'lucide-react';
import ProNav from './ProNav'
import ReviewCard from "../../components/ReviewCard"
import EditIcon from '@mui/icons-material/Edit';
import { AdminContext } from '../../context/AdminContext'


const ProProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const {auth}=useContext(AppContext)
  const [professional, setProfessional] = useState({});
  const navigate=useNavigate()
  const {updateProfessionalAvailability}=useContext(AdminContext)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Convert availability status to a badge
  const AvailabilityBadge = ({ available }) => (
    <div className={`availability-badge ${available ? 'available' : 'unavailable'}`}>
      <div className={`status-dot ${available ? 'available' : 'unavailable'}`}></div>
      {available ? 'Available' : 'Unavailable'}
    </div>
  );
  useEffect(() => {
      const getProfessional = async () => {
        const response = await auth();
        console.log(response)
          setProfessional(response.user);
      };
  
      getProfessional();
    }, [professional]);

  return (
    <div className="pro-dashboard-page">
        <ProNav/>
          <div className="profile-page">
            <Slidebar />
            
            <div className="profile-container">
      {/* Header Section with Background */}
      <div className="header-background">
        <div className="header-overlay"></div>
        <div className='absolute top-6 right-10 bg-white p-2 border-auto rounded-full cursor-pointer' title="Edit Details"
        onClick={()=>navigate("/update-professional/"+professional._id)}
        ><EditIcon/></div>
      </div>
      
      {/* Profile Info Section */}
      <div className="profile-content">
        <div className="profile-top">
          {/* Profile Image */}
          <div className="profile-image-container">
            <img 
              src={professional.image || "/placeholder-image.jpg"}
              alt={professional.name} 
              className="profile-image"
            />
          </div>
          
          {/* Basic Info */}
          <div className="profile-basic-info">
            <div className="profile-header">
              <div>
                <h1 className="profile-name">{professional.name}</h1>
                <p className="profile-service">{professional.service}</p>
              </div>
              <div className="profile-status">
                <AvailabilityBadge available={professional.available} />
                <span className="profile-fee">₹{professional.fees}</span>
              </div>

              <div className='relative left-35 top-5'>
                            <input type="checkbox" className="professional-check" checked={professional.available} onClick={()=>updateProfessionalAvailability(professional._id)} />
                              <span
                                className={`professional-availability ${professional.available ? "available" : "unavailable"}`}
                              >
                                {professional.available ? "Available" : "Unavailable"}
                              </span>
                            </div>
            </div>
            
            {/* Stats & Experience */}
            <div className="profile-stats">
              <div className="stat-item">
                <Briefcase size={18} className="stat-icon" />
                <span>{professional.experience}</span>
              </div>
              <div className="stat-item">
                <Star size={18} className="star-icon" />
                <span>{professional.rating || 'New'}</span>
              </div>
              {professional.certification && (
                <div className="stat-item">
                  <Award size={18} className="award-icon" />
                  <span>{professional.certification}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="tabs-navigation">
          <button
            onClick={() => setActiveTab('about')}
            className={`tab-button ${activeTab === 'about' ? 'active-tab' : ''}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`tab-button ${activeTab === 'contact' ? 'active-tab' : ''}`}
          >
            Contact & Location
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`tab-button ${activeTab === 'availability' ? 'active-tab' : ''}`}
          >
            Availability
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`tab-button ${activeTab === 'reviews' ? 'active-tab' : ''}`}
          >
            Reviews
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="tab-content">
          {/* About Section */}
          {activeTab === 'about' && (
            <div className="about-section">
              <h2 className="section-title">About Me</h2>
              <p className="about-text">{professional.about}</p>
              <div className="service-details">
                <h3 className="subsection-title">Service Details</h3>
                <ul className="details-list">
                  <li className="detail-item">
                    <div className="icon-container">
                      <Award size={16} />
                    </div>
                    <div className="detail-content">
                      <p className="detail-title">Professional {professional.service}</p>
                      <p className="detail-description">Experienced in all types of {professional?.service?.toLowerCase()}</p>
                    </div>
                  </li>
                  <li className="detail-item">
                    <div className="icon-container">
                      <Clock size={16} />
                    </div>
                    <div className="detail-content">
                      <p className="detail-title">{professional.experience} Experience</p>
                      <p className="detail-description">Providing quality service since {new Date().getFullYear() - parseInt(professional.experience)}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Contact Section */}
          {activeTab === 'contact' && (
            <div className="contact-section">
              <h2 className="section-title">Contact Information</h2>
              <div className="contact-grid">
                <div className="contact-card">
                  <div className="contact-item">
                    <div className="contact-icon-container">
                      <Phone className="contact-icon" />
                    </div>
                    <div className="contact-details">
                      <h3 className="contact-type">Phone</h3>
                      <p className="contact-value">+91 {professional.contactNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-card">
                  <div className="contact-item">
                    <div className="contact-icon-container">
                      <Mail className="contact-icon" />
                    </div>
                    <div className="contact-details">
                      <h3 className="contact-type">Email</h3>
                      <p className="contact-value">{professional.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="address-card">
                  <div className="contact-item">
                    <div className="contact-icon-container">
                      <MapPin className="contact-icon" />
                    </div>
                    <div className="contact-details">
                      <h3 className="contact-type">Address</h3>
                      <p className="contact-value">
                        {professional.address}, {professional.city} , PIN: {professional.pinCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Availability Section */}
          {activeTab === 'availability' && (
            <div className="availability-section">
              <h2 className="section-title">Service Availability</h2>
              <div className="availability-info">
                <p className="availability-text">
                  {professional.available 
                    ? "Currently available for new bookings. Standard service fee: ₹" + professional.fees
                    : "Currently unavailable for new bookings. Please check back later."}
                </p>
              </div>
              
              <div className="booked-slots-container">
                <h3 className="subsection-title">Upcoming Booked Slots</h3>
                
                {Object.keys(professional.slots_booked).length > 0 ? (
                  <div className="slots-list">
                    {Object.entries(professional.slots_booked).map(([date, times]) => (
                      times.length > 0 && (
                        <div key={date} className="slot-item">
                          <div className="slot-icon-container">
                            <Calendar className="slot-icon" />
                          </div>
                          <div className="slot-details">
                            <p className="slot-date">{date}</p>
                            <div className="slot-times">
                              {times.map(time => (
                                
                                <span key={time} className="time-badge">
                                  <Clock size={12} className="time-icon" />
                                  {time}
                                </span>
                            
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <p className="no-slots-message">No booked slots currently.</p>
                )}
              </div>
            </div>
          )}
          
          {/* Reviews Section */}
          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <div className="reviews-header">
                <h2 className="section-title">Client Reviews</h2>
                <div className="rating-display">
                  <Star className="rating-star" />
                  <span className="rating-value">{professional.rating || 'New'}</span>
                </div>
              </div>
              
              {professional.reviews.length > 0 ? (
                <div className="reviews-list">
                  {professional.reviews.map((review, index) => (
                    <div key={index} className="review-item">
                    {professional?.reviews?.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-reviews-container">
                  <Star className="empty-star" />
                  <h3 className="no-reviews-title">No Reviews Yet</h3>
                  <p className="no-reviews-text">
                    This professional is new to our platform or hasn't received any reviews yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Contact Button
        <div className="contact-button-container">
          <button className="contact-button">
            <Phone size={18} className="button-icon" />
            Contact Now
          </button>
        </div> */}
      </div>
    </div>

          </div>
        </div>
    
  );
};

export default ProProfile;