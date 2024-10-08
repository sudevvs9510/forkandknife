// import React, { useState, useEffect } from 'react';
// import { useAppSelector } from '../../redux/app/store';
// import { RootState } from '../../redux/app/store';
// import { addTimeSlot, getTimeSlot, deleteTimeSlot } from '../../api/RestaurantApis';
// import toast from "react-hot-toast";

// interface TimeSlotTypes {
//   restaurantId: string | null;
//   slotStartTime: string;
//   slotEndTime: string;
//   _id?: string;
// }

// const TimeSlotManager: React.FC = () => {
//   const [timeSlots, setTimeSlots] = useState<TimeSlotTypes[]>([]);
//   const [startTime, setStartTime] = useState<string>('');
//   const [endTime, setEndTime] = useState<string>('');
//   const [error, setError] = useState<string>('');

//   console.log(timeSlots)

//   const restaurantId = useAppSelector((state: RootState) => state.restaurantAuth.restaurantId);


//   const fetchTimeSlots = async () => {
//     try {
//       const response = await getTimeSlot();
//       if(response.data.timeSlotDatas){
//       setTimeSlots(response.data.timeSlotDatas);
//       }
//     } catch (error) {
//       console.error('Error fetching time slots:', error);
//     }
//   };
//   useEffect(() => {
//     fetchTimeSlots();
//   }, []);
  
//   const convertTo12HourFormat = (time: string) => {
//     const [hour, minute] = time.split(':').map(Number);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const hour12 = hour % 12 || 12;
//     return `${hour12}:${minute < 10 ? `0${minute}` : minute} ${ampm}`;
//   };

//   const handleAddSlot = async () => {
//     if (!startTime || !endTime) {
//       setError('Start time and end time are required');
//       return;
//     }

//     // Convert times to Date objects for comparison
//     const start = new Date(`1970-01-01T${startTime}:00`);
//     const end = new Date(`1970-01-01T${endTime}:00`);

//     if (start > end) {
//       setError('End time must be after start time');
//       return;
//     }

//     // Check for overlapping slots
//     const isOverlap = timeSlots.some((slot) => {
//       const existingStart = new Date(`1970-01-01T${slot.slotStartTime}:00`);
//       const existingEnd = new Date(`1970-01-01T${slot.slotEndTime}:00`);

//       return (start < existingEnd && end > existingStart);
//     });

//     if (isOverlap) {
//       setError('Time slot already exists');
//       return;
//     }

//     const newSlot: TimeSlotTypes = {
//       restaurantId: restaurantId,
//       slotStartTime: startTime,
//       slotEndTime: endTime,
//     };

//     try {
//       const response = await addTimeSlot(newSlot);
//       if (response.data.status) {
//         fetchTimeSlots()
//         setStartTime('');
//         setEndTime('');
//         setError('');
//         toast.success('Time slot added successfully');
//       } else {
//         setError(response.data.message);
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding time slot:', error);
//       setError('Failed to add time slot');
//       toast.error('Failed to add time slot');
//     }
//   };

//   const handleDeleteSlot = async (timeSlotId: string) => {
//     try {
//       const res = await deleteTimeSlot(timeSlotId, restaurantId || '');
//       if (res.data.status) {

//         fetchTimeSlots()
//         const data = [...timeSlots].filter(item => item._id !== timeSlotId)
//         setTimeSlots(data);
//         toast.success('Time slot deleted successfully');
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error('Error deleting time slot:', error);
//       toast.error('Failed to delete time slot');
//     }
//   };

//   return (
//     <div className="p-4 min-h-screen flex flex-col items-center">
//       <h1 className="text-2xl font-bold mb-4 text-left w-full text-black">Time Slot</h1>
//       <h2 className="text-xl text-teal-800 mb-4">Add New Slot</h2>

//       <div className="flex flex-col mb-4">
//         <div className="flex items-center mb-4">
//           <div className="mr-4">
//             <input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               required
//             />
//           </div>
//           <div className='px-2 py-1'>
//             <button
//               onClick={handleAddSlot}
//               className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
//             >
//               Add Time
//             </button>
//           </div>
//         </div>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//       </div>

//       {timeSlots.length > 0 && (
//         <div className="w-full">
//           <h2 className="text-xl mb-4">Added Time Slots</h2>
//           <table className="bg-white">
//             <tbody>
//               {timeSlots.map((slot) => (
//                 <tr key={slot._id}>
//                   <td className="px-1 py-1 whitespace-no-wrap border-b border-gray-100">{convertTo12HourFormat(slot.slotStartTime)}</td>
//                   <td className="px-1 py-1 whitespace-no-wrap border-b border-gray-100"> - </td>
//                   <td className="px-1 py-1 whitespace-no-wrap border-b border-gray-100">{convertTo12HourFormat(slot.slotEndTime)}</td>
//                   <td className="px-1 py-1 whitespace-no-wrap border-b border-gray-100">
//                     <button
//                       onClick={() => handleDeleteSlot(slot._id as string)}
//                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeSlotManager;



import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/app/store';
import type { RootState } from '../../redux/app/store';
import { addTimeSlot, getTimeSlot, deleteTimeSlot } from '../../api/RestaurantApis';
import { toast } from "react-hot-toast";

interface TimeSlot {
  _id?: string;
  restaurantId: string | null;
  slotStartTime: string;
  slotEndTime: string;
}

const TimeSlotManager: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [error, setError] = useState<string>('');

  const restaurantId = useAppSelector((state: RootState) => state.restaurantAuth.restaurantId);

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const response = await getTimeSlot();
      if (response.data.timeSlotDatas) {
        setTimeSlots(response.data.timeSlotDatas);
      }
    } catch (error) {
      console.error('Error fetching time slots:', error);
      toast.error('Failed to fetch time slots');
    }
  };

  const convertTo12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const handleAddSlot = async () => {
    if (!startTime || !endTime) {
      setError('Start time and end time are required');
      return;
    }

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (start >= end) {
      setError('End time must be after start time');
      return;
    }

    const isOverlap = timeSlots.some((slot) => {
      const existingStart = new Date(`1970-01-01T${slot.slotStartTime}:00`);
      const existingEnd = new Date(`1970-01-01T${slot.slotEndTime}:00`);
      return (start < existingEnd && end > existingStart);
    });

    if (isOverlap) {
      setError('Time slot overlaps with an existing slot');
      return;
    }

    const newSlot: TimeSlot = {
      restaurantId,
      slotStartTime: startTime,
      slotEndTime: endTime,
    };

    try {
      console.log("Sending new slot data:", newSlot);
      const response = await addTimeSlot(newSlot);
      console.log("Server response:", response);
      if (response.status) {
        await fetchTimeSlots();
        setStartTime('');
        setEndTime('');
        setError('');
        toast.success('Time slot added successfully');
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error adding time slot:', error);
      setError('Failed to add time slot');
      toast.error('Failed to add time slot');
    }
  };

  const handleDeleteSlot = async (timeSlotId: string) => {
    try {
      const response = await deleteTimeSlot(timeSlotId, restaurantId || '');
      if (response.data.status) {
        setTimeSlots(timeSlots.filter(slot => slot._id !== timeSlotId));
        toast.success('Time slot deleted successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting time slot:', error);
      toast.error('Failed to delete time slot');
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-left w-full text-black">Time Slot Manager</h1>
      
      <section className="w-full max-w-md mb-8">
        <h2 className="text-xl text-teal-800 mb-4">Add New Slot</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              aria-label="Start time"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              aria-label="End time"
            />
          </div>
          <button
            onClick={handleAddSlot}
            className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Add Time Slot
          </button>
        </div>
        {error && <p className="text-red-500 mt-2" role="alert">{error}</p>}
      </section>

      {timeSlots.length > 0 && (
        <section className="w-full max-w-md">
          <h2 className="text-xl mb-4">Added Time Slots</h2>
          <ul className="bg-white rounded-lg shadow overflow-hidden">
            {timeSlots.map((slot) => (
              <li key={slot._id} className="border-b last:border-b-0">
                <div className="flex justify-between items-center p-4">
                  <span>
                    {convertTo12HourFormat(slot.slotStartTime)} - {convertTo12HourFormat(slot.slotEndTime)}
                  </span>
                  <button
                    onClick={() => slot._id && handleDeleteSlot(slot._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    aria-label={`Delete time slot ${convertTo12HourFormat(slot.slotStartTime)} - ${convertTo12HourFormat(slot.slotEndTime)}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default TimeSlotManager;
