
// import React, { useState } from 'react';
// import { FaStar } from 'react-icons/fa';

// interface ReviewModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (reviewData: ReviewData) => void;
// }

// interface ReviewData {
//   username?: string;
//   description: string;
//   rating: number;
// }

// const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
//   const [username, setUsername] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [rating, setRating] = useState<number>(0);

//   const handleRating = (newRating: number) => {
//     setRating(newRating);
//   };

//   const handleSubmit = () => {
//     onSubmit({ username, description, rating });
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-4 rounded-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Add Review</h2>
//         <input
//           type="text"
//           placeholder="Username (optional)"
//           className="border border-gray-300 p-2 rounded w-full mb-4"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <textarea
//           placeholder="Description"
//           className="border border-gray-300 p-2 rounded w-full mb-4"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <div className="flex items-center justify-center mb-4">
//           <p>Rating</p>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <FaStar
//               key={star}
//               className={`cursor-pointer ${star <= rating ? 'text-teal-600' : 'text-gray-300'}`}
//               onClick={() => handleRating(star)}
//               size={25}
//             />
//           ))}
//         </div>
//         <div className="flex justify-center">
//           <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">
//             Cancel
//           </button>
//           <button onClick={handleSubmit} className="bg-teal-600  text-white p-2 rounded">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewModal;




import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewData: ReviewData) => void;
}

interface ReviewData {
  username: string;
  description: string;
  rating: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      description: '',
      rating: 0,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long'),
      description: Yup.string().required('Description is required'),
      rating: Yup.number().min(1, 'Rating must be at least 1 star').required('Rating is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Review</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-gray-300 p-2 rounded w-full mb-1"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
           {formik.errors.username && formik.touched.username && (
            <p className="text-red-500 text-sm mb-2">{formik.errors.username}</p>
          )}
          <textarea
            name="description"
            placeholder="Description"
            className="border border-gray-300 p-2 rounded w-full"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500 text-sm mb-2">{formik.errors.description}</p>
          )}
          <div className="flex items-center justify-center mb-2">
            <p className="mr-2">Rating:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${star <= formik.values.rating ? 'text-teal-600' : 'text-gray-300'}`}
                onClick={() => formik.setFieldValue('rating', star)}
                size={25}
              />
            ))}
          </div>
          {formik.errors.rating && formik.touched.rating && (
            <p className="text-red-500 flex justify-center text-sm mb-2">{formik.errors.rating}</p>
          )}
          <div className="flex justify-center">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-teal-600 text-white p-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

