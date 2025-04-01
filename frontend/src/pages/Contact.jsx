import { useContext, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loader from "../components/Loading";

export default function ContactUs() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" ,service:"",city:""});
    const {newReq}=useContext(AppContext)
      const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const res=await newReq(formData)
        setLoading(false)
        if(res?.success){
          window.scrollTo(0,0)
          setFormData({ name: "", email: "", message: "" ,service:"",city:""})
          toast.success("Message Sent Successfully...")
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
        {loading && <Loader/>}
        {/* <div className="about-text"><h2>Contact Us</h2></div> */}
            {/* Professional Banner */}
            <div className="bg-blue-600 mx-20 mt-3 text-white text-center py-10 rounded-lg mb-8">
                <h2 className="text-3xl font-bold">Want to Join as a Professional?</h2>
                <p className="mt-2">We are always looking for skilled professionals to join our team. Contact us today!</p>
            </div>
            
            {/* Contact Section */}
            <div className="max-w-5xl mx-auto bg-white-800 p-8 rounded-lg shadow-lg mb-17 about-text">
                <h2 className="text-3xl font-semibold text-center text-blue-400 mb-15">Contact Us</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mt-13">
                    {/* Contact Info */}
                    <div className="m-13 mt-21" >
                        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                        <p className="text-gray-600 mb-4">Have questions or need assistance? Reach out to us.</p>
                        
                        <div className="space-y-4">
                            <p className="flex items-center gap-2"><FaPhone className="text-blue-500" /> +91 6393295514</p>
                            <p className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> ujjwalgupta0506@gmail.com</p>
                            <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> MMMUT, Gorakhpur, India </p>
                        </div>
                    </div>
                    
                    {/* Contact Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                className="w-full p-2 border rounded" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Service</label>
                            <input type="text" name="service" value={formData.service} onChange={handleChange} required
                                className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} required
                                className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                className="w-full p-2 border rounded" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} required
                                className="w-full p-2 border rounded h-24"></textarea>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Send Message</button>
                    </form>
                </div>

                
            </div>


            
            
        </div>

        
    );
}
