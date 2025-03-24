import React, { useState,useContext, useEffect } from 'react';
import { Bell, Bookmark, Calendar, Edit, Key, LogOut, Mail, MapPin, Phone, User } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

const MyProfilePage = () => {
  const {viewUser,updateUser}=useContext(AdminContext)
  const navigate=useNavigate()
  const {id}=useParams()
  console.log(id)
  const [userData, setUserData] = useState({})
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  // Get first letter of name for avatar fallback
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const saveChanges = async() => {
    const name=userData.name
    const action=await updateUser({name,additionalInfo,id})
    if(action.success){
      setActiveTab('profile')
      toast.success("Profile Updated Successfully")
    }
  }

  
  useEffect(() => {
    const find=async()=>{ 
      const res=await viewUser(id)
      if(res){
        setUserData(res)
        console.log(res)
      }
    }

    find()
    },[])

    useEffect(() => {
      setAdditionalInfo({
        phone: userData?.additionalInfo?.phone,
        address: userData?.additionalInfo?.address,
        city: userData?.city,
        state: userData?.additionalInfo?.state,
        pincode: userData?.additionalInfo?.pincode,
        country: userData?.additionalInfo?.country
      })
    },[userData])
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/3 lg:w-1/4  mt-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
              <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <div className="px-6 pb-6">
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-600 shadow-md">
                    {getInitials(userData.name)}
                  </div>
                </div>
                <h2 className="text-center text-2xl font-bold text-gray-900">{userData.name}</h2>
                <div className="flex items-center justify-center mt-1 text-gray-500">
                  <Mail size={16} className="mr-1" />
                  <p className='pt-2'>{userData.email}</p>
                </div>
                <div className="flex items-center justify-center mt-1 text-gray-500">
                  <Calendar size={16} className="mr-1 mb-3" />
                  <p className="text-sm">Member since {formatDate(userData.createdAt)}</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-500 mb-4">ACCOUNT MANAGEMENT</p>
                  <nav className="space-y-2">
                    <button 
                      className={`w-full flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <User size={18} className="mr-3" />
                      Profile Information
                    </button>
                    <button 
                      className={`w-full flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === 'edit' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('edit')}
                    >
                      <Edit size={18} className="mr-3" />
                      Edit Profile
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:w-2/3 lg:w-3/4">
      <h3 className='mt-3'>Account Id-: <span style={{color:"green"}}>{id}</span></h3>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-2">
            
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Personal Information</h2>
                    <button 
                      onClick={() => setActiveTab('edit')}
                      className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account Details</h3>
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-1">Full Name</p>
                            <p className="font-medium">{userData.name}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-1">Email Address</p>
                            <div className="flex items-center">
                              <Mail size={16} className="text-gray-400 mr-2" />
                              <p className="font-medium pt-3">{userData.email}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                            <div className="flex items-center">
                              <Phone size={16} className="text-gray-400 mr-2" />
                              <p className="font-medium  pt-3">{additionalInfo.phone ? additionalInfo.phone : "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Address Information</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start">
                            <MapPin size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                            {additionalInfo.address ? <>
                              <p className="font-medium">{additionalInfo.address}</p>
                              <p className="text-gray-600">{additionalInfo.city}, {additionalInfo.state} {additionalInfo.pincode}</p>
                              <p className="text-gray-600">{additionalInfo.country}</p>
                            </> : <p>N/A</p>}
                             
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account Status</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Member Since</p>
                              <p className="font-medium">{formatDate(userData.createdAt)}</p>
                            </div>
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'edit' && (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Edit Profile</h2>
                  </div>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={userData.name} onChange={(e)=>setUserData({...userData,name:e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                            value={userData.email}
                            disabled
                          />
                          <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={additionalInfo.phone} onChange={(e)=>setAdditionalInfo({...additionalInfo,phone:e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={additionalInfo.address}  onChange={(e)=>setAdditionalInfo({...additionalInfo,address:e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                              value={additionalInfo.city} onChange={(e)=>setAdditionalInfo({...additionalInfo,city:e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                              value={additionalInfo.state} onChange={(e)=>setAdditionalInfo({...additionalInfo,state:e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                              value={additionalInfo.pincode} onChange={(e)=>setAdditionalInfo({...additionalInfo,pincode:e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                              value={additionalInfo.country} onChange={(e)=>setAdditionalInfo({...additionalInfo,country:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4 border-t border-gray-100 mt-8">
                      <button
                        type="button"
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium mr-3"
                        onClick={() => setActiveTab('profile')}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                        onClick={saveChanges}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfilePage;
  


