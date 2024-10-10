import React from 'react';

const Overview = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-blue-800">Total Stock</h3>
          <p className="text-3xl font-bold text-blue-600">{data.totalStock}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-yellow-800">Expired Medicines</h3>
          <p className="text-3xl font-bold text-yellow-600">{data.expiredMedicines}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-red-800">Need Reorder</h3>
          <p className="text-3xl font-bold text-red-600">{data.reorderNeeded}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
