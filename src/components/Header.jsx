import { User2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';

import { toast } from 'react-toastify';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');

    toast.success('Logout Successful');

    navigate('/login');
  };

  if (location.pathname === '/login') {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },

    ...(user
      ? [
          {
            name: 'Add',
            path: '/add',
            icon: '➕',
          },
          {
            name: 'Edit',
            path: '/edit',
            icon: '✏️',
          },
        ]
      : []),
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b
        ${
          scrolled
            ? 'bg-white/70 backdrop-blur-md border-slate-200/50 py-2 shadow-sm'
            : 'bg-blue-700/90 backdrop-blur-sm border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="group">
            <h1
              className={`text-xl font-extrabold tracking-tight ${
                scrolled ? 'text-blue-700' : 'text-white'
              }`}
            >
              RSSB <span className={scrolled ? 'text-blue-500' : 'text-blue-200'}>Bilaspur</span>
            </h1>

            <p
              className={`text-[10px] uppercase tracking-widest font-semibold ${
                scrolled ? 'text-slate-500' : 'text-blue-100/80'
              }`}
            >
              Attendance System
            </p>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  location.pathname === link.path
                    ? scrolled
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-blue-700'
                    : scrolled
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium"
              >
                Login
              </Link>
            ) : (
              <>
                <span
                  className={`px-3 py-2 text-sm font-semibold ${
                    scrolled ? 'text-slate-700' : 'text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User2 size={16} />
                    <span>{user.email.split('@')[0]}</span>
                  </div>
                </span>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
          >
            ☰
          </button>
        </div>
      </header>

      <div className="h-20 md:h-24" />

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setOpen(false)} />}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[60]
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="font-bold text-blue-700">Bhawani Traders</h2>
            <p className="text-xs text-slate-400">Management Menu</p>
          </div>

          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <nav className="p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 p-4 rounded-xl
              ${
                location.pathname === link.path
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          ))}

          {!user ? (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl text-green-600 hover:bg-green-50"
            >
              🔐 Login
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 text-blue-700 font-semibold">
                <div className="flex items-center gap-2">
                  <User2 size={16} />
                  <span>{user.email.split('@')[0]}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="w-full text-left flex items-center gap-4 p-4 rounded-xl text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Header;
