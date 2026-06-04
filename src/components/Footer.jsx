import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200/60 bg-slate-50 text-slate-600">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6">
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">
              RSSB Bilaspur
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated Attendance Management System (AMS)
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            <Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/add" className="text-slate-500 hover:text-blue-600 transition-colors">
              Mark Attendance
            </Link>
            <Link to="/edit" className="text-slate-500 hover:text-blue-600 transition-colors">
              Edit Records
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200/50" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-400">
          <p>© {currentYear} Bhawani Traders. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-500">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
