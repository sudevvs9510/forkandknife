// import React, { useState } from 'react';
// import { MdTableRestaurant } from "react-icons/md";
// import AddTableDialog from './Modal/AddTableModal';  

// import { getTableDatas, tableSlotTypes } from "../../api/RestaurantApis"


// const RestaurantTables: React.FC = () => {
//   const [tableDatas, setTableDatas] = useState<tableSlotTypes[]>([]);
//   const [showDialog, setShowDialog] = useState(false);



//   const fetchData = () =>{
//     try{
//       const res = await getTableDatas(id as string)
//       console.log(res, id)
//       setTableDatas(res.data.tableSlotDatas)

//     } catch(error){
//       console.log("Error fetching table datas", error)
//     }
//   }

//   const handleView = (table: tableSlotTypes) => {
//     alert(`Viewing details for table number: ${table.tableno}`);
//   };

//   const handleAddTable = (values: tableSlotTypes) => {
//     setTableDatas([...tableDatas, { ...values, slno: (tableDatas.length + 1).toString() }]);
//     setShowDialog(false);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Table Management</h2>
//         <button
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
//           onClick={() => setShowDialog(true)}
//         >
//           Add Table <MdTableRestaurant className="ml-2" />
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className='bg-gray-100'>
//               <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Sl. No</th>
//               <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Table No</th>
//               <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Capacity</th>
//               <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Indoor/Outdoor</th>
//               <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableDatas.map((table) => (
//               <tr key={table.slno} className='border-b border-gray-200'>
//                 <td className="px-6 3 whitespace-no-wrap ">{table.slno}</td>
//                 <td className="px-6 3 whitespace-no-wrap ">{table.tableno}</td>
//                 <td className="px-6 3 whitespace-no-wrap ">{table.capacity}</td>
//                 <td className="px-6 3 whitespace-no-wrap ">{table.indoorOutdoor}</td>
//                 <td className="px-6 3 whitespace-no-wrap ">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleView(table)}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showDialog && (
//         <AddTableDialog
//           onClose={() => setShowDialog(false)}
//           onSubmit={handleAddTable}
//         />
//       )}
//     </div>
//   );
// };

// export default RestaurantTables;


import React, { useState, useEffect } from "react";
import { MdTableRestaurant } from "react-icons/md";
import AddTableDialog from "./Modal/AddTableModal";
import { getTableDatas, TableSlotTypes } from "../../api/RestaurantApis";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

const RestaurantTables: React.FC = () => {
  const [tableDatas, setTableDatas] = useState<TableSlotTypes[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const { restaurantId, role } = useSelector(
    (state: RootState) => state.restaurantAuth
  );

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        if (role === "restaurant" && restaurantId) {
          const res = await getTableDatas(restaurantId);
          setTableDatas(res.data.tableSlotDatas);
        } else {
          // Handle unauthorized access or invalid role
          console.error("Unauthorized access or invalid role.");
        }
      } catch (error) {
        console.log("Error fetching table data", error);
      }
    };

    if (role === "restaurant" && restaurantId) {
      fetchTableData();
    }
  }, [restaurantId, role]);

  const handleView = (table: TableSlotTypes) => {
    alert(`Viewing details for table number: ${table.tableNumber}`);
  };

  const handleAddTable = (values: TableSlotTypes) => {
    setTableDatas([...tableDatas, { ...values }]);
    setShowDialog(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Table Management</h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => setShowDialog(true)}
        >
          Add Table <MdTableRestaurant className="ml-2" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">
                Sl. No
              </th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">
                Table No
              </th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">
                Indoor/Outdoor
              </th>
              <th className="px-6 py-3 border-b-2 text-left leading-4 text-teal-600 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableDatas.map((tableData: TableSlotTypes, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-6 py-3 whitespace-no-wrap">{index + 1}</td>
                <td className="px-6 py-3 whitespace-no-wrap">
                  {tableData.tableNumber}
                </td>
                <td className="px-6 py-3 whitespace-no-wrap">
                  {tableData.tableCapacity}
                </td>
                <td className="px-6 py-3 whitespace-no-wrap">
                  {tableData.tableLocation}
                </td>
                <td className="px-6 py-3 whitespace-no-wrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleView(tableData)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDialog && (
        <AddTableDialog
          onClose={() => setShowDialog(false)}
          onSubmit={handleAddTable}
        />
      )}
    </div>
  );
};

export default RestaurantTables;
