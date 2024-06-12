import { Routes, Route, Navigate } from 'react-router-dom'
import DashBoard from './pages/Dashboard'
import LoginPage from './pages/Login'
import SignUp from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoutes'
import StudentDashBoard from './pages/StudentDashBoard'
import StudentLogin from './pages/StudentLogin'
import Complaints from './pages/Complaints'
import GenerateReport from './pages/GenerateReport'


function App(){
  return(
    <>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to={'/student/dashboard'}/>}/>
          <Route path='/student' element={<Navigate to={'/student/dashboard'}/>}/>
          <Route path='/maindashboard' element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
          <Route path='/reportgenerate' element={<ProtectedRoute><GenerateReport/></ProtectedRoute>}/>
          <Route path='/student/dashboard' element={<ProtectedRoute><StudentDashBoard/></ProtectedRoute>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/student/login' element={<StudentLogin/>}/>
          <Route path='/student/signup' element={<SignUp/>}/>
          <Route path='/student/complaints' element={<ProtectedRoute><Complaints/></ProtectedRoute>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
