import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const SignUp = (props) => {

    const [studentid,setStudentID] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('male')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)

        if(password !== password2){
            setError('Passwords are not the same')
            setPassword('')
            setPassword2('')
            setLoading(false)
            return
        }
        axios.post("/api/auth/student/signup", {studentid: studentid, password: password, name: name, email: email, gender: gender})
        .then((res) => {
            console.log(res.data)
            if(res.data.status === 'ok'){
                setLoading(false)
                navigate('/student/login')
                return
            }
            setError(res.data.error)
            setLoading(false)
            return
        })
        .catch((err) => {
            setError(err.response.data.detail)
            setLoading(false)
            return
        })
    }

    useEffect(() => {
        console.log(gender)
    }, [])

    if(loading){
        return(
            <div className="h-screen w-full flex flex-row items-center text-center text-[#6fe957] bg-white">
                <p className='w-fit mx-auto text-3xl font-semibold'>Loading...</p>
            </div>
        )
    }

    return(
        <div className='h-screen w-full flex flex-col justify-center bg-[#eaecef]'>
            <form onSubmit={handleSubmit} className='h-5/6 w-2/5 mx-auto mt-14 flex flex-col justify-evenly shadow-2xl bg-white'>
                <h1 className='w-full text-center text-2xl font-semibold'>SignUp</h1>
                <div className='w-11/12 pl-4 mx-auto flex flex-row items-center justify-between'>
                    <input value={studentid} onChange={(e) =>setStudentID(e.target.value)} className='h-10 w-10/12 mx-auto px-4 py-6 border-solid border-2 border-gray-400 rounded-lg bg-white' id='studentid' name='studentid' placeholder='Student ID' type="text" required />
                </div>
                <div className='w-11/12 pl-4 mx-auto flex flex-row items-center justify-between'>
                    <input value={name} onChange={(e) =>setName(e.target.value)} className='h-10 w-10/12 mx-auto px-4 py-6 border-solid border-2 border-gray-400 rounded-lg bg-white' placeholder='Full Name' type="text" required/>
                </div>
                <div className='w-11/12 pl-4 mx-auto flex flex-row items-center justify-between'>
                    <input value={email} onChange={(e) =>setEmail(e.target.value)} className='h-10 w-10/12 mx-auto px-4 py-6 border-solid border-2 border-gray-400 rounded-lg bg-white' placeholder='Email' type="email" required/>
                </div>
                <div className='w-11/12 pl-4 mx-auto flex flex-row items-center justify-between'>
                    <select defaultValue={"male"} onChange={(e) =>setGender(e.target.value)} className='h-10 w-10/12 mx-auto px-4 py-6 border-solid border-2 border-gray-400 rounded-lg bg-white'>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className='w-11/12 pl-4 mx-auto flex flex-row items-center justify-between'>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='h-10 w-10/12 mx-auto px-4 py-6 border-solid border-2 border-gray-400 rounded-lg bg-white' id='password' name='password' placeholder='Enter password' type="password" />
                </div>
                <div className='w-11/12 pl-4 mx-auto flex flex-row items-center justify-between'>
                    <input value={password2} onChange={(e) => setPassword2(e.target.value)} className='h-10 w-10/12 mx-auto px-4 py-6 border-solid border-2 border-gray-400 rounded-lg bg-white' id='password2' name='password2' placeholder='Confirm password' type="password" />
                </div>
                <div className='w-full text-center text-red-500'>{error}</div>
                <button type='submit' className='h-14 w-3/5 mx-auto text-lg font-medium bg-[#6fe957] hover:bg-[#4C9F70]'>SignUp</button>
            </form>
            <Link to={'/student/login'} className='w-1/12 mx-auto text-center mt-16 text-[#6fe957]'>Login</Link>
        </div>
    )
}

export default SignUp
