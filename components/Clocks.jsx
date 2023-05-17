"use client"
import React, { useState, useEffect } from "react";

const Clock = ({ label, timezone }) => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { timeZone: timezone })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: timezone }));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow-md hover:bg-blue-200 w-[200px]'>
      <h2 className='text-2xl font-semibold mb-2'>{label}</h2>
      <p className='text-3xl'>{time}</p>
    </div>
  );
};

const Clocks = () => {
  return (
    <div className='flex flex-col items-center space-y-4 justify-center h-screen'>
      <Clock label='India' timezone='Asia/Kolkata' />
      <Clock label='United States' timezone='America/New_York' />
      <Clock label='Malaysia' timezone='Asia/Kuala_Lumpur' />
      <Clock label='UAE' timezone='Asia/Dubai' />
    </div>
  );
};

export default Clocks;
