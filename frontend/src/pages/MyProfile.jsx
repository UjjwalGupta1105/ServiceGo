import React, { useState,useContext, useEffect } from 'react';
import { Bell, Bookmark, Calendar, Edit, Key, LogOut, Mail, MapPin, Phone, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../components/Loading";

const MyProfilePage = () => {
  const {auth,updateUser,UpdatePassword,userLogOut}=useContext(AppContext)
  const navigate=useNavigate()
  const [userData, setUserData] = useState({})
  const [updatePass,setUpdatePass]=useState({
    currPass:"",
    newPass:"",
    confirmNewPass:""
  })

  const [additionalInfo, setAdditionalInfo] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);

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
    setLoading(true)
    const name=userData.name
    const action=await updateUser({name,additionalInfo})
    if(action.success){
      setActiveTab('profile')
      toast.success("Profile Updated Successfully")
    }
    setLoading(false)
  }

  const updatePassword=async()=>{
    setLoading(true)
    const res=await UpdatePassword(updatePass)
    if(res.success){
      toast.success("Password Updated Successfully...")
      setUpdatePass({
        currPass:"",
        newPass:"",
        confirmNewPass:""
      })
      setLoading(false)
    }
  }
  const logoutUser=async()=>{
    setLoading(true)
    const response=await userLogOut()
    if(response){
      navigate("/register")
      toast.success("Logged Out Successfully...")
    }
    setLoading(false)
  }

  useEffect(() => {
    const find=async()=>{ 
      const res=await auth()
      if(res.sucess){
        console.log(res.user)
        setUserData(res.user)
      }
      setLoading(false)
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
      {loading && <Loader/>}
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div> */}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/3 lg:w-1/4">
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
                    <button 
                      className={`w-full flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === 'password' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('password')}
                    >
                      <Key size={18} className="mr-3" />
                      Update Password
                    </button>
                    {/* <button 
                      className={`w-full flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === 'bookings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('bookings')}
                    >
                      <Bookmark size={18} className="mr-3" />
                      My Bookings
                    </button> */}
                  </nav>
                </div>
                <div className="mt-2 pt-3 border-t border-gray-100">
                  <button 
                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg py-2.5 font-medium transition-colors"
                    onClick={()=>logoutUser()}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:w-2/3 lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-8">
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
              
              {activeTab === 'password' && (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Update Password</h2>
                  </div>
                  <p className="text-gray-500 mb-6">Ensure your account is using a secure password</p>
                  
                  <form className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="••••••••"
                        value={updatePass.currPass}
                        onChange={(e)=>setUpdatePass({...updatePass,currPass:e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input 
                        type="password" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="••••••••"
                         value={updatePass.newPass}
                        onChange={(e)=>setUpdatePass({...updatePass,newPass:e.target.value})}
                      />
                      <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters and include a number and a special character</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="••••••••"
                        value={updatePass.confirmNewPass}
                        onChange={(e)=>setUpdatePass({...updatePass,confirmNewPass:e.target.value})}
                      />
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
                        onClick={updatePassword}
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'bookings' && (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Bookings</h2>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bookmark size={24} className="text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">You haven't made any bookings yet. Explore our services and make your first booking!</p>
                    <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors">
                      Explore Options
                    </button>
                  </div>
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