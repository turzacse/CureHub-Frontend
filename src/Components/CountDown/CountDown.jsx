// import React, { useEffect, useState } from "react";

// // Helper function to parse the date and time
// const parseAppointmentDateTime = (appointedDate, appointedTime) => {
//   // Extract the start time (before the `-`)
//   const startTime = appointedTime.split(" - ")[0].trim();

//   // Convert the date to the format `YYYY-MM-DD`
//   const [day, month, year] = appointedDate.split("/");
//   const formattedDate = `${year}-${month}-${day}`;

//   // Combine the date and time into a single string
//   const dateTimeString = `${formattedDate} ${startTime}`;

//   // Return the JavaScript Date object
//   return new Date(dateTimeString);
// };

// const CountDown = ({ appointment }) => {
//   const [countdown, setCountdown] = useState("");

//   useEffect(() => {
//     // Parse the date and time into a Date object
//     const appointmentDateTime = parseAppointmentDateTime(
//       appointment?.appointedDate,
//       appointment?.appointedTime
//     );

//     // Update countdown every second
//     const interval = setInterval(() => {
//       const now = new Date();
//       const timeDifference = appointmentDateTime - now;

//       if (timeDifference > 0) {
//         // Calculate remaining time
//         const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
//         const seconds = Math.floor((timeDifference / 1000) % 60);

//         // Update the countdown state
//         setCountdown(
//           `${days}, ${hours.toString().padStart(2, "0")}:${minutes
//             .toString()
//             .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//         );
//       } else {
//         // If the countdown is over
//         setCountdown("00, 00:00:00");
//         clearInterval(interval);
//       }
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup the interval on component unmount
//   }, [appointment]);

//   return (
//     <div className="flex-1 flex justify-center bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-lg py-2 shadow-lg px-4">
//   <p className="text-gray-200 font-bold text-lg">{countdown}</p>
// </div>

//   );
// };

// export default CountDown;


import React, { useState, useEffect } from "react";

// Helper function to parse the appointed date and time
const parseAppointmentDateTime = (appointedDate, appointedTime) => {
  // Extract the start time (before the `-`)
  const startTime = appointedTime.split(" - ")[0].trim();

  // Convert the date to the format `YYYY-MM-DD`
  const [day, month, year] = appointedDate.split("/");
  const formattedDate = `${year}-${month}-${day}`;

  // Combine the date and time into a single string
  const dateTimeString = `${formattedDate} ${startTime}`;

  // Return the JavaScript Date object
  return new Date(dateTimeString);
};

const CountDown = ({ appointment }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!appointment?.appointedDate || !appointment?.appointedTime) {
      setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      return;
    }

    // Parse the appointed date and time into a target Date object
    const targetDate = parseAppointmentDateTime(
      appointment?.appointedDate,
      appointment?.appointedTime
    );

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        setTimeLeft({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [appointment]);

  return (
    <div className="flex flex-col items-center bg-gray-300 text-white px-4 py-2 rounded-md">
      <h1 className="text-[12px] font-bold mb-2 text-gray-700">Appointment Time</h1>
      <div className="flex space-x-2">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div
            key={unit}
            className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg px-4 py-2"
          >
            <p className="text-md font-bold">{timeLeft[unit]}</p>
            <p className="text-yellow-400 text-[12px] uppercase">{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountDown;
