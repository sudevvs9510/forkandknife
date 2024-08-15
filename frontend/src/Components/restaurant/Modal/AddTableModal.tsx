
// export default AddTable;
import React, { useState } from 'react';
import { useAppDispatch } from '../../../redux/app/store';
import { MdTableRestaurant } from 'react-icons/md';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TableSlotTypes } from '../../../api/RestaurantApis';
import { addTableData } from '../../../redux/reducers/restaurantSlices/RestaurantTableSlice';
import { toast } from 'react-hot-toast';

interface AddTableProps {
  onAddTable: (values: TableSlotTypes) => void;
}

const AddTable: React.FC<AddTableProps> = ({ onAddTable }) => {
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className='me-[120px]'>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        onClick={() => setShowDialog(true)}
      >
        Add Table <MdTableRestaurant className="ml-2" />
      </button>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Table</h2>
            <Formik
              initialValues={{
                tableNumber: '',
                tableCapacity: 2,
                tableLocation: 'Indoor',
              }}
              validate={(values) => {
                const errors: Partial<TableSlotTypes> = {};
                if (!values.tableNumber) {
                  errors.tableNumber = 'Table No is required';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await dispatch(addTableData(values)).unwrap();
                  toast.success('Table added successfully!');
                  onAddTable(values); // Call the callback function to update the parent component's state
                  setShowDialog(false);
                } catch (error) {
                  toast.error(error as string);
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="tableNumber"
                    >
                      Table No
                    </label>
                    <Field
                      type="text"
                      id="tableNumber"
                      name="tableNumber"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="tableNumber"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="tableCapacity"
                    >
                      Capacity
                    </label>
                    <Field
                      as="select"
                      id="tableCapacity"
                      name="tableCapacity"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="6">6</option>
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="tableLocation"
                    >
                      Indoor/Outdoor
                    </label>
                    <Field
                      as="select"
                      id="tableLocation"
                      name="tableLocation"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                    </Field>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => setShowDialog(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Adding...' : 'Add Table'}
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

export default AddTable;
