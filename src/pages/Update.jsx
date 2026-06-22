import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const API_URL =
  'https://script.google.com/macros/s/AKfycbxWr4zf70Sy9q-RiYo6SqnlTSZRyxxbMk0eSXmFAcNAvjkpvPMjKlquPCfX_mEqCwXNFg/exec';

// Skeleton Component for Table Rows
const TableSkeleton = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <tr key={i} className="animate-pulse border-b border-gray-100">
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </td>
        <td className="p-4 flex gap-2">
          <div className="h-8 bg-gray-200 rounded w-12"></div>
          <div className="h-8 bg-gray-200 rounded w-12"></div>
        </td>
      </tr>
    ))}
  </>
);

const Update = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [masters, setMasters] = useState([]);
  const [saving, setSaving] = useState(false);

  // const loadData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${API_URL}?type=attendance`);
  //     const data = await response.json();
  //     setRecords(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const loadData = async () => {
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await fetch(
        `${API_URL}?type=attendance&email=${encodeURIComponent(user.email)}`
      );

      const data = await response.json();

      setRecords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const loadMasters = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMasters(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadMasters();
  }, []);

  const handleEdit = (record) => {
    setEditForm({
      rowNumber: record.rowNumber,
      scan: record.scan,
      date: String(record.date).split('T')[0],
      shift: record.shift,
      masterName: record.masterName,
    });
    setShowEditModal(true);
  };

  const handleDelete = async (record) => {
    if (!window.confirm(`Delete record for ${record.masterName}?`)) return;
    try {
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', rowNumber: record.rowNumber }),
      });
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'update', ...editForm }),
      });
      setShowEditModal(false);
      loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Attendance Records
            </h1>
            <p className="text-gray-500 mt-1">Manage and update staff attendance logs</p>
          </div>
          <button
            onClick={loadData}
            className="p-2 hover:bg-white rounded-full transition-colors shadow-sm border border-gray-200"
            title="Refresh Data"
          >
            🔄
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-600 text-sm">Timestamp</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Type</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Shift</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Master Name</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <TableSkeleton />
                ) : (
                  records.map((row) => (
                    <tr key={row.rowNumber} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(row.timestamp).toLocaleString('en-IN', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${row.scan === 'SCAN' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
                        >
                          {row.scan}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-700 font-medium">
                        {String(row.date).split('T')[0]}
                      </td>
                      <td className="p-4 text-sm text-gray-600">{row.shift}</td>
                      <td className="p-4 text-sm font-semibold text-gray-800">{row.masterName}</td>
                      <td className="p-4">
                        <div className="flex gap-3">
                          {/* <button
                            onClick={() => handleEdit(row)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                          >
                            Edit
                          </button> */}
                          <button
                            onClick={() => handleDelete(row)}
                            className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {!loading && records.length === 0 && (
            <div className="py-12 text-center text-gray-400">No records found.</div>
          )}
        </div>
      </div>

      {/* Modernized Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Update Attendance</h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Scan Type</label>
                <select
                  value={editForm.scan}
                  onChange={(e) => setEditForm({ ...editForm, scan: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="SCAN">SCAN</option>
                  <option value="NON_SCAN">NON_SCAN</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Date</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Shift</label>
                <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                  {['Morning', 'Evening'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setEditForm({ ...editForm, shift: s })}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                        editForm.shift === s
                          ? 'bg-white shadow-sm text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Master Name</label>
                <Select
                  options={masters.map((item) => ({ value: item.name, label: item.name }))}
                  value={
                    editForm.masterName
                      ? { value: editForm.masterName, label: editForm.masterName }
                      : null
                  }
                  onChange={(sel) => setEditForm({ ...editForm, masterName: sel?.value || '' })}
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.5rem',
                      padding: '2px',
                      borderColor: '#d1d5db',
                    }),
                  }}
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;