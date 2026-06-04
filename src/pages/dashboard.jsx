import React from 'react';

const Dashboard = () => {
  // Mock data for easy iteration
  const stats = [
    {
      label: 'Total Employees',
      value: '125',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      icon: '👥',
    },
    {
      label: 'Present Today',
      value: '98',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      icon: '✅',
    },
    { label: 'Absent Today', value: '27', color: 'text-rose-600', bg: 'bg-rose-50', icon: '❌' },
    {
      label: 'Total Logs',
      value: '2,450',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      icon: '📊',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Bhawani Traders Attendance Management</p>
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
                <div className={`${stat.bg} p-3 rounded-2xl text-2xl`}>{stat.icon}</div>
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
        <div className="grid lg:grid-cols-3 gap-8">
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    {
                      name: 'Rahul Sharma',
                      date: '03-06-2026',
                      shift: 'Morning',
                      status: 'Present',
                    },
                    { name: 'Amit Kumar', date: '03-06-2026', shift: 'Evening', status: 'Present' },
                    { name: 'Ravi Singh', date: '03-06-2026', shift: 'Morning', status: 'Absent' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                            {row.name.charAt(0)}
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
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            row.status === 'Present'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${row.status === 'Present' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          ></span>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Actions & Progress */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                    + Add Attendance
                  </button>
                  <button className="w-full bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95 border border-white/10">
                    View Reports
                  </button>
                  <button className="w-full bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95 border border-white/10">
                    Export Data (CSV)
                  </button>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all"></div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>📈</span> Monthly Completion
              </h3>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
                <div className="bg-violet-500 h-3 rounded-full w-[78%] transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>78% ACHIEVED</span>
                <span>GOAL: 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
