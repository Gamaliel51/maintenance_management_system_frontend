import { useEffect, useState } from "react"
import StudentNavbar from "../components/StudentNavbar"
import axios from "axios"


const CommentModal = (props) => {
    const complaint_id = props.complaint_id
    const setShowCommentModal = props.setShowCommentModal
    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.post(`/api/student/comment`, {complaint_id: complaint_id, comment: comment}, config)
        .then((res) => {
            if(res.data.status === 'ok'){
                alert('Comment Saved')
                setShowCommentModal(false)
                return
            }
            else{
                alert('Error. try again.')
                setShowCommentModal(false)
                return
            }
        })
        .catch((err) => {
            console.error(err)
        })

    }

    return(
        <div className="min-h-screen w-full flex flex-col fixed top-0 left-0 bg-gray-600 bg-opacity-25">
            <div onClick={() => setShowCommentModal(false)} className="text-3xl font-bold absolute top-14 right-14 cursor-pointer text-white">X</div>
            <div className="h-[60vh] w-3/5 m-auto flex flex-col bg-white">
                <p className="w-full text-center text-lg font-semibold py-4">Comment on satisfaction on complaint resolution.</p>
                <textarea placeholder="Write about your opinion on the maintenance actions taken." value={comment} onChange={(e) => setComment(e.target.value)} 
                className="h-3/5 w-10/12 mx-auto p-4 border-solid border-2"/>
                <button onClick={(e) => handleSubmit(e)} className="h-fit w-3/5 mx-auto my-4 py-4 rounded-sm bg-[#6fe957]">Submit</button>
            </div>
        </div>
    )
}


const Complaints = () => {

    const [complaints, setComplaints] = useState([])

    const [currentComplaintID, setCurrentComplaintID] = useState('')
    const [showCommentModal, setShowCommentModal] = useState(false)

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.get(`/api/student/getallcomplaints`, config)
        .then((res) => {
            if(res.data.status === 'ok'){
                console.log(res.data)
                setComplaints(res.data.data)
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
            {showCommentModal && <CommentModal complaint_id={currentComplaintID} setShowCommentModal={setShowCommentModal}/>}
            <div className="h-[85vh] w-full flex flex-row flex-wrap justify-center items-center overflow-y-auto">
                <div></div>
                <div className="h-fit w-full flex flex-col overflow-y-auto text-black">
                    {complaints.map((complaint) => {
                        console.log(complaint)
                        return(
                            <div className="h-40 w-11/12 mx-auto mt-4 flex flex-row justify-between items-center border-solid border-2 bg-white">
                                {<div className="h-fit w-3/5 px-10 py-2 cursor-pointer">
                                        <p className="font-thin text-sm mb-3">{complaint.complaint_id}</p>
                                        <p className="font-semibold text-lg">{complaint.building}: {complaint.location}</p>
                                        <p className="font-semibold text-lg">{complaint.category}: {complaint.item}</p>
                                        <p className="font-thin text-sm my-3">{complaint.start_date}</p>
                                    </div>}
                                {complaint.status === 'received' && 
                                <div className="h-fit w-fit mr-16 py-3 px-4 rounded-2xl bg-blue-300">
                                    Status: Received
                                </div>
                                }
                                {complaint.status === 'in progress' &&
                                    <div className="h-fit w-fit mr-16 py-3 px-4 rounded-2xl bg-yellow-300">
                                        Status: In Progress
                                    </div>
                                }
                                {complaint.status === 'done' &&
                                    <div className="h-fit w-fit mr-16 py-3 px-4 rounded-2xl bg-green-300">
                                        Status: Done
                                    </div>
                                }
                                {((complaint.status === 'done') && (complaint.satisfaction === "none")) &&
                                    <div onClick={() => {setCurrentComplaintID(complaint.complaint_id);setShowCommentModal(true)}} className="h-fit w-fit mr-8 py-3 px-4 rounded-2xl cursor-pointer bg-green-300 hover:bg-[#4C9F70]">
                                        Comment
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default Complaints
