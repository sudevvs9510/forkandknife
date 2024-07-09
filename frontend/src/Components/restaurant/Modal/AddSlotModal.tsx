// import React from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { MenuItem, Select, InputLabel, FormControl, Box, Button } from '@mui/material';
// import toast from 'react-hot-toast';

// interface TableSlotTime {
//   tableSlotDate: string;
//   tableSlotTime: string;
// }

// interface AddTableSlotProps {
//   tableNo: string;
//   onClose: () => void;
//   onSubmit: (values: TableSlotTime) => void;
// }

// const generateTimeSlots = () => {
//   const slots = [];
//   const start = new Date();
//   start.setHours(0, 0, 0, 0);

//   for (let i = 0; i < 24; i++) {
//     const startTime = new Date(start);
//     const endTime = new Date(start);
//     endTime.setHours(startTime.getHours() + 1);
//     slots.push(
//       `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
//     );
//     start.setHours(start.getHours() + 1);
//   }

//   return slots;
// };

// const AddTableSlot: React.FC<AddTableSlotProps> = ({ tableNo, onClose, onSubmit }) => {
//   const timeSlots = generateTimeSlots();

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Add Slot for Table {tableNo}</h2>
//         <Formik
//           initialValues={{
//             tableSlotDate: '',
//             tableSlotTime: '',
//           }}
//           validate={(values) => {
//             const errors: Partial<TableSlotTime> = {};
//             if (!values.tableSlotDate) {
//               errors.tableSlotDate = 'Date is required';
//             }
//             if (!values.tableSlotTime) {
//               errors.tableSlotTime = 'Time Slot is required';
//             }
//             return errors;
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             onSubmit(values);
//             toast.success('Slot created successfully!');
//             setSubmitting(false);
//             onClose();
//           }}
//         >
//           {({ isSubmitting, setFieldValue, values }) => (
//             <Form>
//               <Box mb={2}>
//                 <DatePicker
//                   selected={values.tableSlotDate ? new Date(values.tableSlotDate) : null}
//                   // onChange={(date: Date) => setFieldValue('tableSlotDate', date.toISOString().split('T')[0])}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholderText="Select a date"
//                   dateFormat="yyyy-MM-dd"
//                 />
//                 <ErrorMessage name="tableSlotDate" component="div" className="text-red-500 text-xs italic" />
//               </Box>
//               <Box mb={2}>
//                 <FormControl fullWidth>
//                   <InputLabel id="slot-time-label">Slot Time</InputLabel>
//                   <Select
//                     labelId="slot-time-label"
//                     value={values.tableSlotTime}
//                     onChange={(e) => setFieldValue('tableSlotTime', e.target.value)}
//                     label="Slot Time"
//                   >
//                     {timeSlots.map((slot) => (
//                       <MenuItem key={slot} value={slot}>
//                         {slot}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <ErrorMessage name="tableSlotTime" component="div" className="text-red-500 text-xs italic" />
//               </Box>
//               <Box display="flex" justifyContent="flex-end">
//                 <Button
//                   type="button"
//                   variant="contained"
//                   color="error"
//                   style={{ marginRight: '0.5rem' }}
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={isSubmitting}
//                 >
//                   Add Slot
//                 </Button>
//               </Box>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddTableSlot;





import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface TableSlotTime {
  tableSlotDate: string;
  tableSlotTime: string;
}

interface AddTableSlotProps {
  tableNo: string;
  onClose: () => void;
  onSubmit: (values: TableSlotTime) => void;
}

const generateTimeSlots = () => {
  const slots = [];
  const start = new Date();
  start.setMinutes(0, 0, 0);

  while (start.getHours() < 23) {
    const startTime = new Date(start);
    const endTime = new Date(start);
    endTime.setHours(startTime.getHours() + 1);
    slots.push(
      `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    );
    start.setHours(start.getHours() + 1);
  }

  return slots;
};

const AddTableSlot: React.FC<AddTableSlotProps> = ({ tableNo, onClose, onSubmit }) => {
  const timeSlots = generateTimeSlots();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Add Slot for Table {tableNo}</h2>
        <Formik
          initialValues={{
            tableSlotDate: '',
            tableSlotTime: '',
          }}
          validate={(values) => {
            const errors: Partial<TableSlotTime> = {};
            if (!values.tableSlotDate) {
              errors.tableSlotDate = 'Date is required';
            }
            if (!values.tableSlotTime) {
              errors.tableSlotTime = 'Time Slot is required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            toast.success('Slot created successfully!');
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableSlotDate">
                  Select Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={values.tableSlotDate ? new Date(values.tableSlotDate) : null}
                    // onChange={(date: Date) => setFieldValue('tableSlotDate', date ? date.toISOString().split('T')[0] : '')}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()} // Prevents selecting past dates
                    customInput={
                      <div className="relative">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Select date"
                          value={values.tableSlotDate}
                          readOnly
                        />
                        <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    }
                  />
                </div>
                <ErrorMessage name="tableSlotDate" component="div" className="text-red-500 text-xs italic mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableSlotTime">
                  Select Time Slot
                </label>
                <div className="relative">
                  <select
                    id="tableSlotTime"
                    value={values.tableSlotTime}
                    onChange={(e) => setFieldValue('tableSlotTime', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="" disabled>
                      Select a time slot
                    </option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <FaClock className="absolute right-3 top-3 text-gray-400" />
                </div>
                <ErrorMessage name="tableSlotTime" component="div" className="text-red-500 text-xs italic mt-1" />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  Add Slot
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTableSlot;
