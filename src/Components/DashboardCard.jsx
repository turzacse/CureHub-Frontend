import React from 'react';

const DashboardCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DashboardCard;
