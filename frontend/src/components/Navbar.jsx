import img from "../assets/logo2.jpg"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import UseOptions from "./UseOptions"
import { AppContext } from "../context/AppContext"

const Header = () => {
  const [User, setUser] = useState()
  const { auth, user, isAuthenticated } = useContext(AppContext)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1050)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1050)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    async function check() {
      const data = await auth()
      if (data?.sucess) {
        setUser(data?.user)
      }
    }
    check()
  }, [])

  return isMobile ? (
    <>
      {/* Mobile View */}
      <div className="w-full bg-gray-100 px-4 py-4 flex justify-between items-center flex-wrap">
        <div className="phone-title flex items-center gap-1">
          <img src={img} alt="logo" className="h-16 w-16 rounded-full" />
          <h2 className="phone-heading  text-2xl font-bold text-blue-600">Service Go</h2>
        </div>

        <div className="second-phone sm:mt-0 sm:ml-auto">
          {isAuthenticated ? (
            <UseOptions />
          ) : (
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-base font-semibold hover:bg-blue-700 transition-all"
            >
              Signup/Login
            </Link>
          )}
        </div>

        <div className="w-full mt-4">
          <ul className="flex justify-center gap-6 flex-wrap text-[17px] font-semibold text-gray-800">
            <li><Link to="/" className="hover:text-blue-600 transition-all">Home</Link></li>
            <li><Link to="/Services/all-services" className="hover:text-blue-600 transition-all">Services</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 transition-all">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 transition-all">Contact</Link></li>
          </ul>
        </div>
      </div>
    </>
  ) : (
    <>
      {/* Desktop View */}
      <div className="header">
        <div className="first">
          <img src={img} alt="logo." />
          <h2>Service Go</h2>
        </div>
        <div className="mid">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Services/all-services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="second">
          {isAuthenticated ? <UseOptions /> : (
            <Link to="/register">Signup/Login</Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
