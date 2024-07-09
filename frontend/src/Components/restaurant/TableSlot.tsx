// import React, { useState } from 'react';
// import AddTableSlot from './Modal/AddSlotModal';
// import toast, { Toaster } from 'react-hot-toast';

// interface TableSlotTime {
//   tableSlotDate: string;
//   tableSlotTime: string;
// }

// const TableSlots: React.FC = () => {
//   const [slots, setSlots] = useState<TableSlotTime[]>([]);
//   const [showSlotDialog, setShowSlotDialog] = useState(false);

//   const handleAddSlot = (slot: TableSlotTime) => {
//     setSlots([...slots, slot]);
//     toast.success('Slot created successfully!');
//     setShowSlotDialog(false);
//   };

//   const handleDeleteSlot = (index: number) => {
//     const updatedSlots = slots.filter((_, i) => i !== index);
//     setSlots(updatedSlots);
//     toast.success('Slot deleted successfully!');
//   };

//   return (
//     <div className="p-4">
//       <Toaster />
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Table Slot</h2>
//         <button
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => setShowSlotDialog(true)}
//         >
//           Add Slot
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Sl. No</th>
//               <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Date</th>
//               <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Time</th>
//               <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {slots.map((slot, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{index + 1}</td>
//                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(slot.tableSlotDate).toLocaleDateString()}</td>
//                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{slot.tableSlotTime}</td>
//                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
//                   <button
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleDeleteSlot(index)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showSlotDialog && (
//         <AddTableSlot
//           tableNo=""
//           onClose={() => setShowSlotDialog(false)}
//           onSubmit={handleAddSlot}
//         />
//       )}
//     </div>
//   );
// };

// export default TableSlots;

import React, { useState } from 'react';
import AddTableSlot from './Modal/AddSlotModal';
import toast, { Toaster } from 'react-hot-toast';

interface TableSlotTime {
  tableSlotDate: string;
  tableSlotTime: string;
}

const TableSlots: React.FC = () => {
  const [slots, setSlots] = useState<TableSlotTime[]>([]);
  const [showSlotDialog, setShowSlotDialog] = useState(false);

  const handleAddSlot = (slot: TableSlotTime) => {
    setSlots([...slots, slot]);
    toast.success('Slot created successfully!');
    setShowSlotDialog(false);
  };

  const handleDeleteSlot = (index: number) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
    toast.success('Slot deleted successfully!');
  };

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Table Slot</h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowSlotDialog(true)}
        >
          Add Slot
        </button>
      </div>

      {slots.length === 0 ? (
        <div className="flex-grow flex flex-col mt-20 items-center">
          <p className="font-bold text-red-500">No table slots available</p>
          <p className="text-gray-600">Please add a new slot using the button above.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Sl. No</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Date</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Time</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(slot.tableSlotDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{slot.tableSlotTime}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteSlot(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showSlotDialog && (
        <AddTableSlot
          tableNo=""
          onClose={() => setShowSlotDialog(false)}
          onSubmit={handleAddSlot}
        />
      )}
    </div>
  );
};

export default TableSlots;
