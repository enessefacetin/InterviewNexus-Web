import React, {useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const { isAuthenticated } = useAuth();
    
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" width="100" height="100" />
            <p>Interview Nexus</p>
        </div>
        <ul className="nav-menu">
            <li onClick={() => {setMenu("home")}}> <Link style={{textDecoration:'none', color: '#626262' }} to='/'>Ana Sayfa</Link> {menu==="home"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("companies")}}><Link style={{textDecoration:'none', color: '#626262'}} to='/companies'>Şirketler</Link>{menu==="companies"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("professions")}}><Link style={{textDecoration:'none', color: '#626262'}} to='/professions'>Meslekler</Link>{menu==="professions"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("interviewAdd")}}><Link style={{textDecoration:'none', color: '#626262'}} to='/add-interview'>Mülakat Ekle</Link>{menu==="interviewAdd"?<hr/>:<></>}</li>
        </ul>
        {
              isAuthenticated ? (
                // If logged in, show profile icon and title
                <div className="nav-profile">
                  <Link to="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Profile</span>
                    <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ color: '#0c9cb1' }} />
                  </Link>
                </div>
              ) : (
                <div className="nav-login">
                    <Link style={{textDecoration:'none'}} to='login'><button onClick={() => {setMenu("login")}}>Giriş Yap</button></Link>
                </div>
              )
        }
        
    </div>
  )
}

export default Navbar
