import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Scan, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import Select from 'react-select';

const customSelectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    padding: '4px',
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    '&:hover': { borderColor: '#cbd5e1' },
  }),
};

function Add() {
  const [masters, setMasters] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageError, setImageError] = useState(false);

  const [form, setForm] = useState({
    scan: '',
    date: new Date().toISOString().split('T')[0],
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
      await fetch(
        'https://script.google.com/macros/s/AKfycbwx1U9qnfxPCKJYhKw5ZiCr2t1RYJMUrs4iIKURyFY2OmrWbRDsuVKepiF5NxTW6E9qDQ/exec',
        {
          method: 'POST',
          body: JSON.stringify(form),
        }
      );

      alert('Saved Successfully');

      setForm({
        scan: '',
        date: new Date().toISOString().split('T')[0],
        shift: '',
        masterName: '',
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
                  onChange={(e) => setForm({ ...form, scan: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="">Select Status</option>
                  <option value="SCAN">SCAN</option>
                  <option value="NON_SCAN">NON_SCAN</option>
                </select>
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

              {/* Master Name */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                  <User size={16} className="text-blue-600" />
                  Master Name
                </label>
                <Select
                  options={masters.map((item) => ({
                    value: item.name,
                    label: item.name,
                    image: item.image,
                  }))}
                  styles={customSelectStyles} // Optional: Pass custom styles for better matching
                  placeholder="Search Master Name..."
                  isSearchable
                  value={
                    form.masterName ? { value: form.masterName, label: form.masterName } : null
                  }
                  onChange={(selected) => {
                    setForm({ ...form, masterName: selected?.value || '' });
                    setSelectedImage(selected?.image || '');
                  }}
                />
              </div>
            </div>

            {/* Verification Status Area */}
            <div
              className={`mt-2 p-4 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                selectedImage ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {selectedImage ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <CheckCircle2 size={20} />
                    Verified Identity
                  </div>
                  <a
                    href={selectedImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    View Credentials <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400 py-2">
                  <XCircle size={24} className="text-slate-300" />
                  <span className="text-sm font-medium">Pending Verification</span>
                </div>
              )}
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
