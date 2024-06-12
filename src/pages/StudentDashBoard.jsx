import { useEffect, useState } from "react"
import StudentNavbar from "../components/StudentNavbar"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getCategories } from "../utility"

const StudentDashBoard = (props) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [studentData, setStudentData] = useState({})
    const [selectData, setSelectData] = useState(getCategories())
    const [building_types, setBuildingTypes] = useState(selectData['college'])
    const [selectedBuilding, setSelectedBuilding] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('electrical')
    const [spoiltItem, setSpoiltItem] = useState('')
    const [location, setLocation] = useState('')

    
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.post(`/api/student/addcomplaint`, {building: selectedBuilding, category: selectedCategory, item: spoiltItem, location: location}, config)
        .then((res) => {
            if(res.data.status === 'ok'){
                alert("Complaint has been registered")
                window.location.reload()
            }
            else{
                alert("An error occurred. Please try again")
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.get(`/api/student/profile`, config)
        .then((res) => {
            if(res.data.status === 'ok'){
                console.log(res.data)
                setStudentData(res.data.data)
                return
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    return(
        <div className="min-h-screen w-full bg-[#eaecef]">
            <StudentNavbar/>
            <div className="h-[85vh] w-full flex flex-row flex-wrap justify-center items-center">
                <div className="h-full w-8/12 pt-5 flex flex-col bg-[#eaecef]">
                    <p className="w-3/5 mx-auto py-5 text-lg font-bold text-start">Welcome, {studentData.studentname}</p>
                    <form onSubmit={handleSubmit} className="h-[70vh] w-3/5 mx-auto flex flex-col justify-evenly rounded-md bg-[#6fe957]">
                        <p className="w-10/12 mx-auto font-thin text-sm">What type of building ?</p>
                        <select onChange={(e) => setBuildingTypes(selectData[e.target.value])} className="h-fit w-10/12 py-2 px-4 mx-auto text-center text-lg font-semibold">
                            {selectData.building_type.map((type) => {
                                return(
                                    <option value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                )
                            })}
                        </select>
                        <p className="w-10/12 mx-auto font-thin text-sm">What building ?</p>
                        <select onChange={(e) => setSelectedBuilding(e.target.value)} className="h-fit w-10/12 py-2 px-4 mx-auto text-center text-lg font-semibold">
                            <option value=""></option>
                            {(JSON.stringify(building_types) == JSON.stringify(selectData['college']))
                            && 
                            building_types.building_list.map((building) => {
                                return(
                                    <option value={building}>{building.charAt(0).toUpperCase() + building.slice(1)}</option>
                                )
                            })}
                            {(JSON.stringify(building_types) == JSON.stringify(selectData['hostels']) && studentData.gender === 'male')
                            && 
                            building_types.building_list_male.map((building) => {
                                return(
                                    <option value={building}>{building.charAt(0).toUpperCase() + building.slice(1)}</option>
                                )
                            })
                            }
                            {(JSON.stringify(building_types) == JSON.stringify(selectData['hostels']) && studentData.gender === 'female')
                            && 
                            building_types.building_list_female.map((building) => {
                                return(
                                    <option value={building}>{building.charAt(0).toUpperCase() + building.slice(1)}</option>
                                )
                            })
                            }
                        </select>
                        <p className="w-10/12 mx-auto font-thin text-sm">What Category ?</p>
                        <select onChange={(e) => setSelectedCategory(e.target.value)} className="h-fit w-10/12 py-2 px-4 mx-auto text-center text-lg font-semibold">
                            <option value=""></option>
                            {building_types.categories.map((category) => {
                                return(
                                    <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                                )
                            })}
                        </select>
                        <p className="w-10/12 mx-auto font-thin text-sm">What is the affected item ?</p>
                        <select onChange={(e) => setSpoiltItem(e.target.value)} className="h-fit w-10/12 py-2 px-4 mx-auto text-center text-lg font-semibold">
                            <option value=""></option>
                            {building_types[selectedCategory].map((items) => {
                                return(
                                    <option value={items}>{items.charAt(0).toUpperCase() + items.slice(1)}</option>
                                )
                            })}
                        </select>
                        <p className="w-10/12 mx-auto font-thin text-sm">What is the location of the item inside the building ?</p>
                        <input type="text" placeholder="Enter Room Number/Location" value={location} onChange={(e) => setLocation(e.target.value)} className="h-fit w-10/12 py-2 px-2 mx-auto text-center text-xs font-semibold"/>
                        <button type="submit" className="h-fit w-10/12 mx-auto py-5 px-4 rounded-sm bg-white hover:bg-gray-300">Submit Complaint</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default StudentDashBoard