import "./App.css"
import BusDetailPage from "./pages/BusDetailPage"
import HomePage from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserProfile from "./pages/UserProfile"
import CreateTicket from "./pages/CreateTicket"



function App() {
  return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/bus/:id' element={<BusDetailPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/create/ticket' element={<CreateTicket />} />
      </Routes>
  )
}

export default App
