import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../Layout/Header';
import Overview from './Overview';
import MedicineList from './MedicineList';
import InsertMedicineForm from './InsertMedicineForm';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '../../config';

const Dashboard = ({ onLogout, username }) => {
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [overviewData, setOverviewData] = useState({
    totalStock: 0,
    expiredMedicines: 0,
    reorderNeeded: 0,
  });
  const [error, setError] = useState(null);

  const fetchMedicines = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/medicines`);
      setMedicines(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setError('Failed to fetch medicines. Please try again later.');
    }
  }, []);

  const fetchOverviewData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/overview`);
      setOverviewData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching overview data:', error);
      setError('Failed to fetch overview data. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchMedicines();
    fetchOverviewData();
  }, [fetchMedicines, fetchOverviewData]);

  const handleAddMedicine = async (newMedicine) => {
    try {
      await axios.post(`${API_URL}/api/medicines`, newMedicine);
      await fetchMedicines();
      await fetchOverviewData();
      setShowInsertForm(false);
      setError(null);
    } catch (error) {
      console.error('Error adding/updating medicine:', error);
      setError('Failed to add/update medicine. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 h-full">
      <Header onLogout={onLogout} username={username} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInsertForm(true)}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg transition duration-300 ease-in-out text-xs sm:text-sm"
          >
            <PlusCircle className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Medicine</span>
          </motion.button>
        </div>
        
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Overview data={overviewData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Medicine List</h2>
              <MedicineList medicines={medicines} />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {showInsertForm && (
        <InsertMedicineForm onClose={() => setShowInsertForm(false)} onSubmit={handleAddMedicine} />
      )}
    </div>
  );
};

export default Dashboard;