import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

interface Table {
  serialNumber: string;
  tableno: string;
  capacity: string;
  indoorOutdoor: string;
}

interface AddTableDialogProps {
  onClose: () => void;
  onSubmit: (values: Table) => void;
}

const AddTableDialog: React.FC<AddTableDialogProps> = ({ onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Table</h2>
        <Formik
          initialValues={{
            serialNumber: '',
            tableno: '',
            capacity: '2',
            indoorOutdoor: 'Indoor',
          }}
          validate={values => {
            const errors: Partial<Table> = {};
            if (!values.tableno) {
              errors.tableno = 'Table No is required';
            }
            // Add more validations as needed
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableno">
                  Table No
                </label>
                <Field
                  type="text"
                  id="tableno"
                  name="tableno"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="tableno" component="div" className="text-red-500 text-xs italic" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                  Capacity
                </label>
                <Field
                  as="select"
                  id="capacity"
                  name="capacity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                </Field>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="indoorOutdoor">
                  Indoor/Outdoor
                </label>
                <Field
                  as="select"
                  id="indoorOutdoor"
                  name="indoorOutdoor"
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
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isSubmitting}
                >
                  Add Table
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTableDialog;
