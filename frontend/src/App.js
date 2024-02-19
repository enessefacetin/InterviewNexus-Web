import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Companies from './Pages/Companies';
import Professions from './Pages/Professions';
import Footer from './Components/Footer/Footer';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import InterviewDetail from './Pages/InterviewDetail';
import CompanyDetail from './Pages/CompanyDetail';
import ProfessionDetail from './Pages/ProfessionDetail';
import AddInterview from './Pages/AddInterview';
import Profile from './Pages/Profile';
import EditInterview from './Pages/EditInterview';
import Admin from './Pages/Admin';



function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />

          <Route path="/companies" element={<Companies />} />
          <Route path="/professions" element={<Professions />} />


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/interview/:id" element={<InterviewDetail />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/profession/:id" element={<ProfessionDetail />} />

          <Route path="/add-interview" element={<AddInterview />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/edit-interview/:id" element={<EditInterview />} />

          <Route path="/admin" element={<Admin />} />





        </Routes>
      </div>
      
      <Footer />
      </BrowserRouter>
    
    </div>
  );
}

export default App;
