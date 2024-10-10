import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Package, AlertTriangle, Activity, Archive } from 'lucide-react';

const MedicineList = ({ medicines }) => {
  return (
    <div className="overflow-hidden">
      {medicines.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 text-center py-8"
        >
          No medicines added yet. Click "Add Medicine" to get started.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-5 mx-2">
          {medicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
              whileHover={{ 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                borderColor: '#4F46E5',
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-indigo-100 p-4 border-b border-indigo-200">
                <h3 className="text-lg font-semibold text-indigo-800 truncate">{medicine.medicineName}</h3>
              </div>
              <div className="p-4 space-y-3">
                <InfoItem icon={<Package className="w-5 h-5 text-blue-500" />} label="Current Stock" value={medicine.currentStock} />
                <InfoItem icon={<Archive className="w-5 h-5 text-green-500" />} label="Needed" value={medicine.medicineNeeded} />
                <InfoItem icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />} label="Expired" value={medicine.expiredMedicine} />
                <InfoItem icon={<Activity className="w-5 h-5 text-red-500" />} label="Used" value={medicine.medicineUsed} />
                <InfoItem icon={<Pill className="w-5 h-5 text-purple-500" />} label="Remaining" value={medicine.remainingStock} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm text-gray-600">{label}:</span>
    </div>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default MedicineList;
