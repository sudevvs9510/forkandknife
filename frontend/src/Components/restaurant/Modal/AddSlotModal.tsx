/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { addTableSlot, getTimeSlot } from '../../../api/RestaurantApis';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';


interface TableSlotTime {
  tableSlotDate: string;
  tableSlotTime: string;
}

const AddTableSlot: React.FC<{ onClose: () => void; onSubmit: (slot: TableSlotTime) => void; }> = ({  onClose, onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const { data: { timeSlotDatas } } = await getTimeSlot();
        const slots = timeSlotDatas.map((slot: any) => {
          const startTime = format(new Date(`1970-01-01T${slot.slotStartTime}:00`), 'hh:mm a');
          const endTime = format(new Date(`1970-01-01T${slot.slotEndTime}:00`), 'hh:mm a');
          return `${startTime} - ${endTime}`;
        });
        setTimeSlots(slots);
      } catch (error) {
        console.error('Failed to fetch time slots:', error);
      }
    };

    fetchTimeSlots();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const {tableId} = useParams()
  const handleAddTableSlot = async (values: TableSlotTime) => {
    try {
      
      const [startTime, endTime] = values.tableSlotTime.split(' - ');
      const tableSlotTimeData = {
        slotStartTime: startTime.trim(),
        slotEndTime: endTime.trim(),
        tableSlotDate: values.tableSlotDate,
      };
      const response = await addTableSlot(tableSlotTimeData, tableId as string);
      console.log(response.data)
      console.log(tableSlotTimeData)
      toast.success(response.data.message);
      onSubmit(values);
      console.log(values)
      setIsModalOpen(false);
    } catch (error) {
      console.log(error)
      toast.error('Failed to create slot.');
    }
  };
  

  return (
    <div>
      <button
        className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenModal}
      >
        Add Table Slot
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Add Slot for Table</h2>
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
                handleAddTableSlot(values);
                setSubmitting(false);
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
                        onChange={(date: Date | null) => {
                          setFieldValue('tableSlotDate', date ? format(date, 'yyyy-MM-dd') : '');
                        }}
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
                      onClick={handleCloseModal}
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
      )}
    </div>
  );
};

export default AddTableSlot;
