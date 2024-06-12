import { FC, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { checkAuth } from '../utility'


const Login = (props) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const gotoSignup = () => {
        navigate('/student/signup')
    }

    useEffect(() => {
        if(checkAuth()){
            navigate('/')
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        
        axios.post(`/api/admin/login/`, {username: userName, password: password})
        .then((res) => {
            if(res.data.status === 'ok'){
                setLoading(false)
                sessionStorage.setItem('accessToken', res.data.accessAdmin)
                setError('')
                setUserName('')
                setPassword('')
                navigate('/maindashboard')
            }
        })
        .catch((err) => {
            setLoading(false)
            setError(err.response.data.detail)
        })
        
    }

    if(loading){
        return(
            <div className="h-screen w-full flex flex-row items-center text-center text-[#6fe957] bg-white">
                <p className='w-fit mx-auto text-3xl font-semibold'>Loading...</p>
            </div>
        )
    }

    return(
        <div className="h-screen w-full flex flex-row justify-end items-center overflow-y-hidden  bg-[#eaecef]">
            <form onSubmit={handleSubmit} className='h-1/2 w-1/4 mx-24 mt-16 flex flex-col items-center justify-center shadow-2xl bg-white'>
                <div className='h-3/4 w-10/12 flex flex-col justify-evenly'>
                    <h1 className='h-fit w-full text-center font-semibold px-4'>Admin Login</h1>
                    <div className='h-8 w-full flex flex-row mt-10 mb-10 justify-evenly items-center'>
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} id='username' name='username' type="text" placeholder='Username' className='h-10 w-10/12 px-4 py-6 border-solid border-2 border-gray-400 rounded-lg bg-white' />
                    </div>
                    <div className='h-8 w-full flex flex-row mb-6 justify-evenly items-center'>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' name='password' type="password" placeholder='Password' className='h-10 w-10/12 px-4 py-6 border-solid border-2 border-gray-400 rounded-lg bg-white' />
                    </div>
                    <button type='submit' className='h-16 w-10/12 mx-auto rounded-md hover:bg-[#4C9F70] bg-[#6fe957]'>Login</button>
                </div>
                <div className='text-red-500 w-full mt-2 text-center text-sm'>{error}</div>
            </form>
            <div className='h-20 w-full flex flex-row justify-between fixed top-2'>
                <div className='h-full w-2/6 px-10 pt-2 flex flex-row justify-start items-center'>
                    <img src="src/assets/result.png" alt="" className='h-full rounded-full'/>
                    <p className='h-full w-fit mx-5 text-center pt-5 font-bold text-2xl'>Maintenance Pro</p>
                </div>
                <div onClick={gotoSignup} className='h-10 w-36 mx-24 mt-10 pt-2 text-center shadow-2xl rounded-md font-semibold cursor-pointer hover:bg-[#4C9F70] bg-[#6fe957]'>SignUp</div>
            </div>
        </div>
    )
}


export default Login