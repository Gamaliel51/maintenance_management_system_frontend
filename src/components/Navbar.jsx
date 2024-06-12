import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { checkAuth } from "../utility"
import axios from "axios"

const Navbar = (props) => {

    const navigate = useNavigate()
    
    const logOut = () => {
        sessionStorage.removeItem('accessToken')
        navigate('/login')
    }

    return(
        <nav className="w-full h-12 flex flex-row justify-between bg-white">
            <div className="h-full w-fit flex items-center pl-4">
                <p className="px-2 font-bold">Maintenance Pro Admin</p>
            </div>
            <div className="h-full w-9/12 px-6 flex flex-row justify-end">
                <Link className="hover:text-[#6fe957] h-full pt-3" to={"/maindashboard"}>Complaint View</Link>
                <Link className="hover:text-[#6fe957] h-full pt-3 ml-24" to={"/reportgenerate"}>Generate Report</Link>
                <div onClick={() => logOut()} className="hover:text-[#6fe957] h-full pt-3 ml-24 cursor-pointer">Log Out</div>
            </div>
        </nav>
    )
}


export default Navbar