import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Dashboard from './pages/dashboard';
import Add from './pages/Add';
import Update from './pages/Update';
import Login from './components/Login';

import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <Add />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit"
              element={
                <ProtectedRoute>
                  <Update />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
