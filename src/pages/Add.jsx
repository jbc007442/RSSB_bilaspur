import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Scan } from 'lucide-react';
import Select from 'react-select';

const customSelectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    padding: '4px',
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    '&:hover': {
      borderColor: '#cbd5e1',
    },
  }),

  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

function Add() {
  const [masters, setMasters] = useState([]);
  const [form, setForm] = useState({
    scan: '',
    date: new Date().toLocaleDateString('en-CA', {
      timeZone: 'Asia/Kolkata',
    }),
    shift: '',
    masterName: '',
    attendanceType: 'IN',
  });

  useEffect(() => {
    const loadMasters = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxWr4zf70Sy9q-RiYo6SqnlTSZRyxxbMk0eSXmFAcNAvjkpvPMjKlquPCfX_mEqCwXNFg/exec',
          {
            method: 'GET',
            redirect: 'follow',
          }
        );

        const data = await response.json();

        console.log('Masters:', data);
        setMasters(data);
      } catch (error) {
        console.error('Error loading masters:', error);
      }
    };

    loadMasters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxWr4zf70Sy9q-RiYo6SqnlTSZRyxxbMk0eSXmFAcNAvjkpvPMjKlquPCfX_mEqCwXNFg/exec',
        
        {
          method: 'POST',
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(result.message);

      setForm({
        scan: '',
        date: new Date().toLocaleDateString('en-CA', {
          timeZone: 'Asia/Kolkata',
        }),
        shift: '',
        masterName: '',
        attendanceType: 'IN',
      });
    } catch (err) {
      console.error(err);
      alert('Error saving data');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Decorative Element */}
        <div className="h-2 bg-blue-600 rounded-t-2xl mb-[-8px] mx-4 opacity-50" />

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white p-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-center">AMS OF JULY</h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                Daily Attendance Portal
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Scan Status */}
              <div className="relative">
                <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                  <Scan size={16} className="text-blue-600" />
                  Scan Status
                </label>
                <select
                  value={form.scan}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      scan: e.target.value,
                      masterName: '',
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="">Select Status</option>
                  <option value="OPEN">OPEN</option>
                  <option value="SCAN">SCAN</option>
                  <option value="NON_SCAN">NON_SCAN</option>
                </select>
              </div>

              {/* Master Name */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700 z-50">
                  <User size={16} className="text-blue-600" />
                  Master Name
                </label>

                {form.scan === 'OPEN' ? (
                  <input
                    type="text"
                    placeholder="Enter Master Name"
                    value={form.masterName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        masterName: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 uppercase"
                  />
                ) : (
                  <Select
                    options={masters.map((item) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                    styles={customSelectStyles}
                    placeholder="Search Master Name..."
                    isSearchable
                    value={
                      form.masterName ? { value: form.masterName, label: form.masterName } : null
                    }
                    onChange={(selected) => {
                      setForm({
                        ...form,
                        masterName: selected?.value || '',
                      });
                    }}
                  />
                )}
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                  <Calendar size={16} className="text-blue-600" />
                  Attendance Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Shift */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                  <Clock size={16} className="text-blue-600" />
                  Assigned Shift
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Morning', 'Evening'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, shift: s })}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        form.shift === s
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                  Attendance Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {['IN', 'OUT'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, attendanceType: type })}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium ${
                        form.attendanceType === type
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 active:transform active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 mt-4 flex justify-center items-center gap-2"
            >
              Submit Attendance Entry
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-xs mt-6 uppercase tracking-widest">
          © 2024 Attendance Management System
        </p>
      </div>
    </div>
  );
}

export default Add;
