


import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authAxios from '../../redux/api/authApi';
import { useParams } from 'react-router-dom';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewData: ReviewData) => void;
  restaurantId: string | null;
}

interface ReviewData {
  username: string;
  description: string;
  rating: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit, restaurantId }) => {

  const { userId } = useParams()
  console.log(userId, restaurantId)
  const [initialValues, setInitialValues] = useState({
    username: '',
    description: '',
    rating: 0,
  });

  useEffect(() => {
    if (isOpen && restaurantId) {
      fetchReviewData();
    }
  }, [isOpen, restaurantId]);

  useEffect(() => {
    formik.resetForm({
      values: initialValues,
    });
  }, [initialValues]);

  const fetchReviewData = async () => {
    try {
      const res = await authAxios.get(`/get-booking-review/${restaurantId}`);
      if (res.data) {
        setInitialValues({
          username: res.data.reviewDatas.username || '',
          description: res.data.reviewDatas.description || '',
          rating: res.data.reviewDatas.rating || 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long'),
      description: Yup.string().required('Description is required'),
      rating: Yup.number().min(1, 'Rating must be at least 1 star').required('Rating is required'),
    }),
    onSubmit: (values) => {
      onSubmit({ ...values });
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">{initialValues.username ? 'Edit Review' : 'Add Review'}</h2>
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
              {initialValues.username ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;