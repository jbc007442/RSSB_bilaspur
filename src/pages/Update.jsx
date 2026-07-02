import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
      toast.error('Failed to load attendance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
            onClick={() => {
              loadData();
              toast.success('Data refreshed');
            }}
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
    </div>
  );
};

export default Update;