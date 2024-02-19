import React, { useState }  from 'react'
import './Css/Signup.css'
import { useNavigate } from 'react-router-dom';
import API from '../Api/axios';



const Signup = () => {
  const navigate = useNavigate();

  const handleLoginClick = (companyId) => {
    navigate(`/login`);
  };

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationMsg, setValidationMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Name validation
    if (!userData.name.trim()) {
      return "Name is required.";
    }

    // Basic Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userData.email)) {
      return "Invalid email format.";
    }

    // Password minimum length validation
    if (userData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    // Password match validation
    if (userData.password !== userData.confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSignup = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setValidationMsg(errorMsg);
      return;
    }
    try {
      await API.post('/v1/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      // Assuming the server responds with the token upon successful signup
      navigate('/login'); // Redirect user to login page after successful signup
    } catch (error) {
      console.error('Signup error:', error.response.data);
      setValidationMsg(error.response.data.message || "Signup failed due to an error.");
    }
  };

  return (
    <div className='signup'>
      <div className="signup-container">
        <h1>Kayıt Ol</h1>
        {validationMsg && <p className="validation-msg">{validationMsg}</p>}
        <div className="signup-fields">
          <input type="text" placeholder="Ad Soyad" name="name" value={userData.name} onChange={handleChange} />
          <input type="text" placeholder="Email Adres" name="email" value={userData.email} onChange={handleChange} />
          <input type="password" placeholder="Şifre" name="password" value={userData.password} onChange={handleChange} />
          <input type="password" placeholder="Şifre Doğrulama" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
        </div>
        <button onClick={handleSignup}>Kayıt Ol</button>
        <p className='signup-login'>Zaten bir hesabınız var mı? <span onClick={handleLoginClick}>Giriş yap!</span></p>
        {/* <div className="signup-agree">
          <input type="checkbox" name='' id=''/>
          <p>Kullanım Koşulları ve Gizlilik Politikasını okudum, kabul ediyorum.</p>
        </div> */}
      </div>
    </div>
  )
}

export default Signup