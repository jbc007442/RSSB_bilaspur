import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxWr4zf70Sy9q-RiYo6SqnlTSZRyxxbMk0eSXmFAcNAvjkpvPMjKlquPCfX_mEqCwXNFg/exec',
        {
          method: 'POST',
          body: JSON.stringify({
            action: 'login',
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data));

        toast.success('Login Successful');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error(data.message || 'Invalid Email or Password');
      }
    } catch (error) {
      toast.error('Server Error');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
