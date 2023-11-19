import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PackageListPage from './pages/PackageListPage';
import PackageFormPage from './pages/PackageFormPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Layout from './components/Layout';

const App = () => {
  return (
    <div className='App'>

      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PackageListPage />} />
            <Route path="/add-package" element={<PackageFormPage />} />
            <Route path="/edit-package/:id" element={<PackageFormPage />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer position='top-center' style={{ width: "700px" }} />

    </div>
  );
};

export default App;
