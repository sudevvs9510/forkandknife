import React, { useState, useEffect } from "react";
import { getTableDatas, TableSlotTypes, deleteTableDatas } from "../../api/RestaurantApis";
import { RootState, useAppSelector } from "../../redux/app/store";
import AddTable from "./Modal/AddTableModal";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../layouts/ConfirmationModal"; 
import toast from 'react-hot-toast';

const RestaurantTables: React.FC = () => {
  const [tableDatas, setTableDatas] = useState<TableSlotTypes[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const { restaurantId } = useAppSelector((state: RootState) => state.restaurantAuth);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        if (restaurantId) {
          const res = await getTableDatas(restaurantId);
          setTableDatas(res.data.tableSlotDatas);
        } else {
          console.error("Unauthorized access or invalid role.");
        }
      } catch (error) {
        console.log("Error fetching table data", error);
      }
    };
    fetchTableData();
  }, [restaurantId]);

  const handleAddTable = (values: TableSlotTypes) => {
    setTableDatas([...tableDatas, { ...values }]);
  };

  const handleDeleteTable = async () => {
    if (selectedTableId && restaurantId) {
      try {
        const { message, status } = await deleteTableDatas(restaurantId, selectedTableId);
        if (status) {
          setTableDatas(tableDatas.filter(table => table._id !== selectedTableId));
          toast.success('Table deleted successfully!');
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log("Error deleting table data", error);
        toast.error('Error deleting table!');
      } finally {
        setIsModalOpen(false);
      }
    }
  };

  const openConfirmationModal = (tableId: string) => {
    setSelectedTableId(tableId);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setSelectedTableId(null);
  };

  return (
    <div className="p-4">
      {/* <Toaster /> */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Table Management</h2>
        <AddTable onAddTable={handleAddTable} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Sl. No</th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Table No</th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Capacity</th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Indoor/Outdoor</th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Add Table Slot</th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableDatas.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-3 text-center">
                  No tables added. Add tables using the above "Add Table" button.
                </td>
              </tr>
            ) : (
              tableDatas.map((tableData: TableSlotTypes, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-3 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">{tableData.tableNumber}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">{tableData.tableCapacity}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">{tableData.tableLocation}</td>
                  <td className="px-6 py-3 whitespace-no-wrap">
                    <Link to={`/restaurant/tableslots/${tableData._id}`}>
                      <button className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">View</button>
                    </Link>
                  </td>
                  <td className="px-6 py-3 whitespace-no-wrap">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openConfirmationModal(tableData._id as string)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteTable}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

export default RestaurantTables;
