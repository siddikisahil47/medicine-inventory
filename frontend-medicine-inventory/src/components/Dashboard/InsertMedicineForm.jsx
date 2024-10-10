import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Pill, Package, Archive, AlertTriangle, Activity } from 'lucide-react';
import { API_URL } from '../../config';

const InputField = ({ icon, label, name, type = "text", value, onChange, readOnly = false }) => (
  <div className="relative">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${readOnly ? 'bg-gray-100' : ''}`}
        required={!readOnly}
      />
    </div>
  </div>
);

const InsertMedicineForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    medicineName: '',
    currentStock: '',
    medicineNeeded: '',
    expiredMedicine: '',
    medicineUsed: '',
    remainingStock: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const current = parseInt(formData.currentStock) || 0;
    const used = parseInt(formData.medicineUsed) || 0;
    const expired = parseInt(formData.expiredMedicine) || 0;
    const remaining = current - used - expired;
    setFormData(prev => ({ ...prev, remainingStock: remaining.toString() }));
  }, [formData.currentStock, formData.medicineUsed, formData.expiredMedicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API_URL}/api/medicines`, formData);
      if (response.status === 200 || response.status === 201) {
        onSubmit(response.data.medicine);
        onClose();
      }
    } catch (error) {
      console.error('Error adding/updating medicine:', error);
      setError(error.response?.data?.error || 'An error occurred while adding/updating the medicine');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="relative p-8 bg-white w-full max-w-md m-auto rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 text-indigo-800">Add New Medicine</h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              icon={<Pill className="text-indigo-500" />}
              label="Medicine Name"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
            />
            <InputField
              icon={<Package className="text-blue-500" />}
              label="Current Stock"
              name="currentStock"
              type="number"
              value={formData.currentStock}
              onChange={handleChange}
            />
            <InputField
              icon={<Archive className="text-green-500" />}
              label="Medicine Needed"
              name="medicineNeeded"
              type="number"
              value={formData.medicineNeeded}
              onChange={handleChange}
            />
            <InputField
              icon={<AlertTriangle className="text-yellow-500" />}
              label="Expired Medicine"
              name="expiredMedicine"
              type="number"
              value={formData.expiredMedicine}
              onChange={handleChange}
            />
            <InputField
              icon={<Activity className="text-red-500" />}
              label="Medicine Used"
              name="medicineUsed"
              type="number"
              value={formData.medicineUsed}
              onChange={handleChange}
            />
            <InputField
              icon={<Pill className="text-purple-500" />}
              label="Remaining Stock"
              name="remainingStock"
              type="number"
              value={formData.remainingStock}
              readOnly
            />
            <div className="flex items-center justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Medicine
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InsertMedicineForm;