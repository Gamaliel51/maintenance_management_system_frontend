import { Link, useNavigate } from "react-router-dom"


const StudentNavbar = () => {

    const navigate = useNavigate()

    const logOut = () => {
        sessionStorage.removeItem('accessToken')
        navigate('/student/login')
    }

    return(
        <nav className="w-full h-20 flex flex-row justify-between bg-white">
            <div className="h-full w-fit flex items-center pl-4">
                <p className="px-2 font-bold">Maintenance Pro Student</p>
            </div>
            <div className="h-full w-9/12 px-20 pt-6 flex flex-row justify-end">
                <Link className="hover:text-[#6fe957]" to={"/"}>Make Complaint</Link>
                <Link className="hover:text-[#6fe957] ml-24" to={"/student/complaints"}>View Complaint</Link>
                <div onClick={() => logOut()} className="hover:text-blue-500 cursor-pointer ml-24">LogOut</div>  
            </div>
        </nav>
    )
}


export default StudentNavbar