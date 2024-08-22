// TableSlots.tsx
import React, { useEffect, useState } from 'react';
import AddTableSlot from './Modal/AddSlotModal';
import toast, { Toaster } from 'react-hot-toast';
import { getTableSlot, deleteTableSlot } from '../../api/RestaurantApis';
import { useLocation, useParams } from 'react-router-dom';
import ConfirmationModal from '../../layouts/ConfirmationModal';

interface TableSlots {
  _id: string;
  slotDate: string;
  slotStartTime: string;
  slotEndTime: string;
  isAvailable: boolean
}

const TableSlots: React.FC = () => {
  const [tableDatas, setTableDatas] = useState<TableSlots[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const { tableId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tableNumber = queryParams.get('tableNumber');


  console.log(tableDatas)

  useEffect(() => {
    // const fetchTableData = async () => {
    //   try {
    //     if (tableId) {
    //       const res = await getTableSlot(tableId);
    //       console.log(res.data.tableSlotDatas);
    //       setTableDatas(res.data.tableSlotDatas);
    //     }
    //   } catch (error) {
    //     console.log('Error fetching table datas', error);
    //   }
    // };
    if(tableId) {
      fetchTableData(tableId);
    }
  }, [tableId]);

  const fetchTableData = async (tableId:string) => {
    try {
      if (tableId) {
        const res = await getTableSlot(tableId);
        console.log(res.data.tableSlotDatas);
        setTableDatas(res.data.tableSlotDatas);
      }
    } catch (error) {
      console.log('Error fetching table datas', error);
    }
  };

  const handleAddSlot = async () => {
    if(tableId){
      fetchTableData(tableId)
    }
  };

  const handleDeleteSlot = async () => {
    if (tableId && selectedSlotId) {
      try {
        const res = await deleteTableSlot(tableId, selectedSlotId);
        if (res.status) {
          const updatedSlots = tableDatas.filter((slot) => slot._id !== selectedSlotId);
          setTableDatas(updatedSlots);
          toast.success('Slot deleted successfully!');
        } else {
          toast.error('Failed to delete slot!');
        }
      } catch (error) {
        console.log('Error deleting slot', error);
        toast.error('Error deleting slot!');
      } finally {
        setIsModalOpen(false);
        setSelectedSlotId(null);
      }
    }
  };

  const openConfirmationModal = (slotId: string) => {
    setSelectedSlotId(slotId);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setSelectedSlotId(null);
  };

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"><span className='text-teal-600'>{tableNumber} </span> - Table Slots</h2>
        <AddTableSlot
          onClose={() => {}}
          onSubmit={handleAddSlot}
        />
      </div>
      {tableDatas.length === 0 ? (
        <div className="flex-grow flex flex-col mt-20 items-center">
          <p className="font-bold text-red-500">No table slots available</p>
          <p className="text-gray-600">Please add a new slot using the button above.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Sl. No</th>
                <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Date</th>
                <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Time</th>
                <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Slot Status</th>
                <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableDatas.map((slot, index) => (
                <tr key={slot._id} className="border-b border-gray-200">
                  <td className="px-6 py-3 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">{new Date(slot.slotDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">{`${slot.slotStartTime} - ${slot.slotEndTime}`}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">{slot.isAvailable=== true ? <p className='font-semibold text-green-600 p-2 rounded'>Available</p> : <p className="font-semibold text-red-500 p-2 rounded">Not available</p> }</td>
                  <td className="px-6 py-3 whitespace-no-wrap">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openConfirmationModal(slot._id)}
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
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteSlot}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

export default TableSlots;
