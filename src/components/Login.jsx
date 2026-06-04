// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         'https://script.google.com/macros/s/AKfycbxWr4zf70Sy9q-RiYo6SqnlTSZRyxxbMk0eSXmFAcNAvjkpvPMjKlquPCfX_mEqCwXNFg/exec',
//         {
//           method: 'POST',
//           body: JSON.stringify({
//             action: 'login',
//             email,
//             password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         localStorage.setItem('user', JSON.stringify(data));

//         toast.success('Login Successful');

//         setTimeout(() => {
//           navigate('/');
//         }, 1000);
//       } else {
//         toast.error(data.message || 'Invalid Email or Password');
//       }
//     } catch (error) {
//       toast.error('Server Error');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 w-full mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="bg-blue-600 text-white p-2 w-full">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

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
      // Note: In production, consider moving API endpoints to an environment variable (.env)
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-100"
      >
        {/* --- RSSB Bilaspur Heading Section --- */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">RSSB</h1>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">
            Bilaspur
          </p>
          <div className="h-1 w-12 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>
        {/* ------------------------------------- */}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="border border-gray-300 rounded p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="border border-gray-300 rounded p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-2.5 w-full rounded transition mt-2 shadow-sm"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;