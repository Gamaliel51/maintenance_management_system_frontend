import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"




const GenerateReport = () => {

    const [reportList, setReportList] = useState([])
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

    const [sendReport, setSendReport] = useState(false)

    const handleGenerate = () => {
        let main_details = {
            send_report: sendReport, 
            date_range: null, include_done: done, include_progress: progress, 
            include_received: received, include_all: showAll, 
            electrical: electrical, carpentry: carpentry, facility: facility
        }

        if(start_date_filter.trim() !== "" && stop_date_filter.trim() !== ""){
            main_details.date_range = {start: start_date_filter, stop: stop_date_filter}
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.post('/api/admin/generatereport', main_details, config)
        .then((res) => {
            if(res.data.status === 'ok'){
                setReportList(res.data.data)
                return
            }
        })
        .catch((e) => {
            console.error(e)
        })
    }

    const downloadReport = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
            responseType: 'blob'
        }
        axios.get('/api/admin/download', config)
        .then((res) => {

            const contentDisposition = res.headers['content-disposition'];
            let fileName = 'Generated_Report.xlsx';


            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        })
        .catch((e) => {
            console.error(e)
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
            console.log("HERE: fafss")
        }
        else{
            setShowAll(false)
        }
    }, [selectedList])


    return(
        <div className="min-h-screen w-full bg-[#eaecef]">
            <Navbar/>
            <div className="h-[90vh] w-full my-4 flex flex-row flex-wrap justify-end items-center">
                <div className="h-[85vh] w-[25%] px-4 flex flex-col justify-evenly fixed left-0 rounded-r-xl bg-white">
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
                    <label>
                        <input type="checkbox" checked={sendReport} onChange={(e) => {setSendReport(!sendReport)}}/>
                        &nbsp;&nbsp;Mail this report ?
                    </label>
                    <label className="w-full">
                        date from:
                        <input type="text" className="w-full border-solid border-2 px-4 py-2" placeholder="dd-mm-yyyy" value={start_date_filter} onChange={(e) => setStartDateFilter(e.target.value.trim())}/> 
                    </label>
                    <label className="w-full">
                        date to:
                        <input type="text" className="w-full border-solid border-2 px-4 py-2" placeholder="dd-mm-yyyy" value={stop_date_filter} onChange={(e) => setStopDateFilter(e.target.value.trim())}/> 
                    </label>
                    <button onClick={() => handleGenerate()} className="w-4/5 h-fit py-4 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Generate Report</button>
                    {reportList.length !== 0 && <button onClick={() => downloadReport()} className="w-4/5 h-fit py-4 px-2 mx-auto text-sm font-semibold rounded-sm hover:bg-[#4C9F70] bg-[#6fe957]">Download Report</button>}
                </div>
                <div className="h-[100%] w-[75%] flex flex-col justify-start overflow-y-auto">
                    {reportList.length === 0 && <p className="w-full py-4 text-center">Please use the categories to generate report.</p>}
                    {reportList.map((complaint) => {
                        if(complaint !== null){
                            return(
                                <div className="w-10/12 px-10 py-4 my-4 mx-auto bg-white">
                                    <p className="font-thin text-xs mb-3">{complaint.complaint_id}</p>
                                    <p className="font-thin text-sm mb-3">Location:  {complaint.building} - {complaint.location}</p>
                                    <p className="font-thin text-sm mb-3">Category: {complaint.category}</p>
                                    <p className="font-thin text-sm mb-3">Item:  {complaint.item}</p>
                                    <p className="font-thin text-sm mb-3">Reported by {complaint.studentid} - {complaint.studentname}</p>
                                    <p className="font-thin text-sm mb-3">Date:  {complaint.start_date}</p>
                                    <p className="font-thin text-sm mb-3">Completed:  {complaint.complete_date}</p>
                                    <p className="font-thin text-sm mb-3">Status:  {complaint.status}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}





export default GenerateReport