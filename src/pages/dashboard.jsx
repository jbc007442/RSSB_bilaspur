import React, { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, Activity, CheckCircle2, XCircle, UserRound } from 'lucide-react';

const Dashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    totalGents: 0,
    totalLadies: 0,
    presentToday: 0,
    absentToday: 0,
  });

  useEffect(() => {
    fetchDashboard();
    fetchAttendance();

    const interval = setInterval(() => {
      fetchDashboard();
      fetchAttendance();
    }, 300); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxWr4zf70Sy9q-RiYo6SqnlTSZRyxxbMk0eSXmFAcNAvjkpvPMjKlquPCfX_mEqCwXNFg/exec?type=dashboard'
      );

      const data = await response.json();

      setDashboardData(data);
    } catch (error) {
      console.error('Dashboard Error:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxWr4zf70Sy9q-RiYo6SqnlTSZRyxxbMk0eSXmFAcNAvjkpvPMjKlquPCfX_mEqCwXNFg/exec?type=workhours'
      );

      const data = await response.json();

      setAttendance(data);
    } catch (error) {
      console.error('Attendance Error:', error);
    }
  };
  // Mock data for easy iteration
  const stats = [
    {
      label: 'Total Employees',
      value: dashboardData.totalEmployees,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      icon: Users,
    },
    {
      label: 'Total Gents',
      value: dashboardData.totalGents,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      icon: UserRound,
    },
    {
      label: 'Total Ladies',
      value: dashboardData.totalLadies,
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      icon: UserCheck,
    },
    {
      label: 'Present Today',
      value: dashboardData.presentToday,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Activity className="h-9 w-9 text-blue-600" />
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
            </div>
            <p className="text-slate-500 font-medium mt-1">Attendance Management System</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700">System Online</span>
          </div>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className={`${stat.bg} p-3 rounded-2xl`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live
                </span>
              </div>
              <div className="mt-5">
                <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                <p className={`text-4xl font-black ${stat.color} mt-1 tracking-tight`}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="">
          {/* Recent Attendance Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Recent Attendance</h2>
              <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Employee
                    </th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Date
                    </th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Shift
                    </th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Work Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {attendance.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                            {row.name?.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-700">{row.name}</span>
                        </div>
                      </td>

                      <td className="p-4 text-slate-500 text-sm">{row.date}</td>

                      <td className="p-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                          {row.shift}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            row.workHours === 'Running'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {row.workHours}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
