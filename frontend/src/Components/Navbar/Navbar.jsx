import React, {useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [menu, setMenu] = useState("home");
    

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" width="100" height="100" />
            <p>Interview Nexus</p>
        </div>
        <ul className="nav-menu">
            <li onClick={() => {setMenu("home")}}> <Link style={{textDecoration:'none'}} to='/'>Ana Sayfa</Link> {menu==="home"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("companies")}}><Link style={{textDecoration:'none'}} to='/companies'>Şirketler</Link>{menu==="companies"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("professions")}}><Link style={{textDecoration:'none'}} to='/professions'>Meslekler</Link>{menu==="professions"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("interviewAdd")}}><Link style={{textDecoration:'none'}} to='/add-interview'>Mülakat Ekle</Link>{menu==="interviewAdd"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login">
            <Link style={{textDecoration:'none'}} to='login'><button onClick={() => {setMenu("login")}}>Giriş Yap</button></Link>
        </div>
    </div>
  )
}

export default Navbar
