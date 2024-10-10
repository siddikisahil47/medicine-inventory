import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Layout/Header';
import Overview from './Overview';
import MedicineList from './MedicineList';
import InsertMedicineForm from './InsertMedicineForm';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ onLogout, username }) => {
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [medicines, setMedicines] = useState(() => {
    const savedMedicines = localStorage.getItem('medicines');
    return savedMedicines ? JSON.parse(savedMedicines) : [];
  });
  const [overviewData, setOverviewData] = useState({
    totalStock: 0,
    expiredMedicines: 0,
    reorderNeeded: 0,
  });

  const updateOverviewData = useCallback(() => {
    const totalStock = medicines.reduce((sum, med) => sum + parseInt(med.currentStock), 0);
    const expiredMedicines = medicines.reduce((sum, med) => sum + parseInt(med.expiredMedicine), 0);
    const reorderNeeded = medicines.filter(med => parseInt(med.medicineNeeded) > parseInt(med.currentStock)).length;

    setOverviewData({ totalStock, expiredMedicines, reorderNeeded });
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
    updateOverviewData();
  }, [medicines, updateOverviewData]);

  const handleAddMedicine = (newMedicine) => {
    setMedicines([...medicines, { ...newMedicine, id: Date.now() }]);
    setShowInsertForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 h-full">
      <Header onLogout={onLogout} username={username} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 "
      >
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
