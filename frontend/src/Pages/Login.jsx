import React, { useState } from 'react'
import './Css/Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const handleSignupClick = () => {
    navigate(`/signup`);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from being submitted traditionally

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields. ');
      return;
    }

    // Email validation (simple pattern)
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setError('Invalid email format.');
      return;
    }

    const success = await login(email, password);
    if (success) navigate('/'); // Redirect to home or dashboard
    else setError('Invalid email or password.');
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Giriş Yap</h1>
        {error && <p className="error-message">{error}</p>} {/* Display any error */}
        <div className="login-fields">
            <input type="text" placeholder="Email Adres" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Giriş Yap</button>
        <p className='login-signup'>Bir hesabın yok mu? <span onClick={handleSignupClick}>Kayıt ol!</span></p>
      </div>
    </div>
  )
}

export default Login