import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const ComplaintEditModal = (props) => {
    const complaint = props.complaint
    const setShow = props.setShow
    const [status, setStatus] = useState(complaint.status)

    const updateStatus = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.post('/api/admin/updatestatus', {complaint_id: complaint.complaint_id, status: status}, config)
        .then((res) => {
            if(res.data.status === 'ok'){
                alert('Status updated successfully.')
                setShow(false)
                window.location.reload()
                return
            }
            else{
                alert('An error occurred. Please try again.')
                setShow(false)
                return
            }
        })
        .catch((e) => {
            console.error(e)
        })
    }

    return(
        <div className="min-h-screen w-full flex flex-col fixed top-0 left-0 z-30 bg-gray-600 bg-opacity-25">
            <div onClick={() => setShow(false)} className="text-3xl font-bold absolute top-14 right-14 cursor-pointer text-white">X</div>
            <div className="h-[80vh] w-3/5 m-auto flex flex-col rounded-md bg-white">
                <p className="w-full px-10 py-2 font-semibold text-xs mb-3 border-solid border-b-2">ID: {complaint.complaint_id}</p>
                <p className="w-full px-10 py-2 font-semibold text-sm mb-3 border-solid border-b-2">Location:  {complaint.building} - {complaint.location}</p>
                <p className="w-full px-10 py-2 font-semibold text-sm mb-3 border-solid border-b-2">Category: {complaint.category}</p>
                <p className="w-full px-10 py-2 font-semibold text-sm mb-3 border-solid border-b-2">Item:  {complaint.item}</p>
                <p className="w-full px-10 py-2 font-semibold text-sm mb-3 border-solid border-b-2">Reported by {complaint.studentid} - {complaint.studentname}</p>
                <p className="w-full px-10 py-2 font-semibold text-sm mb-3 border-solid border-b-2">Date:  {complaint.start_date}</p>
                <p className="w-full px-10 py-2 font-semibold text-sm mb-3 border-solid border-b-2">Completed:  {complaint.complete_date}</p>
                <p className="w-full px-10 py-2 font-semibold text-sm mb-3 border-solid border-b-2">Status:  {complaint.status}</p>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-8/12 h-fit mx-auto py-4 text-center">
                    <option value="received">Received</option>
                    <option value="in progress">In progress</option>
                    <option value="done">Done</option>
                </select>
                <button onClick={() => updateStatus()} className="w-3/5 h-fit py-4 px-2 mx-auto my-4 text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Save</button>
            </div>
        </div>
    )
}


const DashBoard = (props) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [currentComplaint, setCurrentComplaint] = useState({})
    const [showComplaintEdit, setShowComplaintEdit] = useState(false)
    const [complaintList, setComplaintList] = useState([])
    const [selectedList, setSelectedList] = useState('')

    const [showAll, setShowAll] = useState(false)
    const [carpentry, setCarpentry] = useState(false)
    const [electrical, setElectrical] = useState(false)
    const [facility, setFacility] = useState(false)

    const [received, setReceived] = useState(false)
    const [progress, setProgress] = useState(false)
    const [done, setDone] = useState(false)

    const [start_date_filter, setStartDateFilter] = useState('')
    const [stop_date_filter, setStopDateFilter] = useState('')

    
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.post(`/api/generate/`, {gpa: gpa, courses: courses}, config)
        .then((res) => {
            setPossibleResults(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        if(carpentry){
            setSelectedList(selectedList + " carpentry ")
        }
        else{
            setSelectedList(selectedList.replace("carpentry", "").trim())
        }
    }, [carpentry])

    useEffect(() => {
        if(electrical){
            setSelectedList(selectedList + " electrical ")
        }
        else{
            setSelectedList(selectedList.replace("electrical", "").trim())
        }
    }, [electrical])

    useEffect(() => {
        if(facility){
            setSelectedList(selectedList + " facility ")
        }
        else{
            setSelectedList(selectedList.replace("facility", "").trim())
        }
    }, [facility])

    useEffect(() => {
        if(received){
            setSelectedList(selectedList + " received ")
        }
        else{
            setSelectedList(selectedList.replace("received", "").trim())
        }
    }, [received])

    useEffect(() => {
        if(progress){
            setSelectedList(selectedList + " progress ")
        }
        else{
            setSelectedList(selectedList.replace("progress", "").trim())
        }
    }, [progress])

    useEffect(() => {
        if(done){
            setSelectedList(selectedList + " done ")
        }
        else{
            setSelectedList(selectedList.replace("done", "").trim())
        }
    }, [done])

    useEffect(() => {
        if(selectedList === ''){
            setShowAll(true)
        }
        else{
            setShowAll(false)
        }
    }, [selectedList])

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.get('/api/admin/getallcomplaints', config)
        .then((res) => {
            if(res.data.status === 'ok'){
                setComplaintList(res.data.data)
                return
            }
        })
        .catch((e) => {
            console.error(e)
        })
    }, [])

    return(
        <div className="min-h-screen w-full bg-[#eaecef]">
            <Navbar/>
            {showComplaintEdit && <ComplaintEditModal complaint={currentComplaint} setShow={setShowComplaintEdit}/>}
            {/* <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button> */}
            <div className="h-[90vh] w-full my-4 flex flex-row flex-wrap justify-end items-center">
                <div className="h-[80vh] w-[25%] px-4 flex flex-col justify-evenly fixed left-0 rounded-r-xl bg-white">
                    <p className="border-solid border-b-2 pb-2">Categories</p>
                    <label>
                        <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.value)}/>
                        &nbsp;&nbsp;All
                    </label>
                    <label>
                        <input type="checkbox" checked={carpentry} onChange={(e) => {setCarpentry(!carpentry)}} />
                        &nbsp;&nbsp;carpentry
                    </label>
                    <label>
                        <input type="checkbox" checked={electrical} onChange={(e) => {setElectrical(!electrical)}}/>
                        &nbsp;&nbsp;electrical
                    </label>
                    <label>
                        <input type="checkbox" checked={facility} onChange={(e) => {setFacility(!facility)}}/>
                        &nbsp;&nbsp;facility
                    </label>
                    <label>
                        <input type="checkbox" checked={received} onChange={(e) => {setReceived(!received)}}/>
                        &nbsp;&nbsp;received
                    </label>
                    <label>
                        <input type="checkbox" checked={progress} onChange={(e) => {setProgress(!progress)}}/>
                        &nbsp;&nbsp;In progress
                    </label>
                    <label>
                        <input type="checkbox" checked={done} onChange={(e) => {setDone(!done)}}/>
                        &nbsp;&nbsp;done
                    </label>
                    <label className="w-full">
                        date from:
                        <input type="text" className="w-full border-solid border-2 px-4 py-2" placeholder="dd-mm-yyyy" value={start_date_filter} onChange={(e) => setStartDateFilter(e.target.value.trim())}/> 
                    </label>
                    <label className="w-full">
                        date to:
                        <input type="text" className="w-full border-solid border-2 px-4 py-2" placeholder="dd-mm-yyyy" value={stop_date_filter} onChange={(e) => setStopDateFilter(e.target.value.trim())}/> 
                    </label>
                </div>
                <div className="h-[100%] w-[75%] flex flex-row flex-wrap overflow-y-auto">
                    {complaintList.map((complaint) => {
                        if(start_date_filter === "" && stop_date_filter === ""){
                            if(showAll){
                                return(
                                    <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                        <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                        <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                        <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                        <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                        <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                        <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                        <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                        <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                        <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                    </div>
                                )
                            }
                            else{
                                if(carpentry && complaint.category === 'carpentry'){
                                    return(
                                        <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                            <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                            <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                            <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                            <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                            <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                            <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                            <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                            <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                            <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                        </div>
                                    )
                                }
                                if(electrical && complaint.category === 'electrical'){
                                    return(
                                        <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                            <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                            <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                            <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                            <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                            <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                            <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                            <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                            <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                            <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                        </div>
                                    )
                                }
                                if(facility && complaint.category === 'facility'){
                                    return(
                                        <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                            <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                            <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                            <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                            <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                            <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                            <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                            <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                            <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                            <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                        </div>
                                    )
                                }
                                if(received && complaint.status === 'received'){
                                    return(
                                        <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                            <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                            <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                            <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                            <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                            <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                            <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                            <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                            <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                            <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                        </div>
                                    )
                                }
                                if(progress && complaint.status === 'in progress'){
                                    return(
                                        <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                            <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                            <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                            <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                            <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                            <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                            <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                            <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                            <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                            <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                        </div>
                                    )
                                }
                                if(done && complaint.status === 'done'){
                                    return(
                                        <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                            <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                            <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                            <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                            <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                            <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                            <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                            <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                            <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                            <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                        </div>
                                    )
                                }
                            }
                        }
                        else{
                            let parts = start_date_filter.split('-')
                            const s_date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
                            parts = stop_date_filter.split('-')
                            const st_date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
                            const  complaint_date = new Date(complaint.start_date).setHours(0, 0, 0, 0)
                            // console.log("\n", s_date, "\n", st_date, "\n", complaint_date)
                            // console.log(complaint_date < st_date)
                            if((complaint_date >= s_date) && (complaint_date <= st_date)){
                                if(showAll){
                                    return(
                                        <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                            <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                            <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                            <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                            <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                            <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                            <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                            <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                            <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                            <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                        </div>
                                    )
                                }
                                else{
                                    if(carpentry && complaint.category === 'carpentry'){
                                        return(
                                            <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                                <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                                <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                                <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                                <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                                <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                                <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                                <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                                <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                                <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                            </div>
                                        )
                                    }
                                    if(electrical && complaint.category === 'electrical'){
                                        return(
                                            <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                                <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                                <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                                <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                                <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                                <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                                <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                                <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                                <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                                <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                            </div>
                                        )
                                    }
                                    if(facility && complaint.category === 'facility'){
                                        return(
                                            <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                                <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                                <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                                <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                                <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                                <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                                <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                                <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                                <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                                <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                            </div>
                                        )
                                    }
                                    if(received && complaint.status === 'received'){
                                        return(
                                            <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                                <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                                <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                                <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                                <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                                <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                                <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                                <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                                <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                                <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                            </div>
                                        )
                                    }
                                    if(progress && complaint.status === 'in progress'){
                                        return(
                                            <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                                <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                                <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                                <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                                <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                                <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                                <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                                <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                                <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                                <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                            </div>
                                        )
                                    }
                                    if(done && complaint.status === 'done'){
                                        return(
                                            <div className="h-80 w-64 my-2 mx-6 px-4 py-2 flex flex-col rounded-lg shadow-2xl bg-white">
                                                <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                                <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                                <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                                <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                                <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                                <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                                <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                                <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                                <button onClick={() => {setCurrentComplaint(complaint);setShowComplaintEdit(true)}} className="w-3/5 h-fit py-1 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Edit Complaint Status</button>
                                            </div>
                                        )
                                    }
                                }
                            }
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default DashBoard