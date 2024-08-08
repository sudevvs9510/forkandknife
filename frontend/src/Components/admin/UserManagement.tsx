
import React, { useEffect, useState } from 'react';
import { getUsers, blockUsers } from '../../api/AdminApis';
import BlockConfirmationModal from '../../layouts/BlockConfirmation';
import { toast } from 'react-hot-toast';

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); 

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await getUsers();
        setUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUserList();
  }, []);

  const handleBlockUser = async () => {
    if (!currentUser) return;

    try {
      const isBlocked = !currentUser.isBlocked;
      await blockUsers(currentUser._id, isBlocked);
      setUsers(users.map(user => user._id === currentUser._id ? { ...user, isBlocked } : user));
      setShowModal(false);
      setCurrentUser(null);
      toast.success(`User ${currentUser.username} has been ${isBlocked ? 'blocked' : 'unblocked'}.`);
    } catch (error) {
      console.error(`Error ${currentUser.isBlocked ? 'unblocking' : 'blocking'} user:`, error);
      toast.error(`Failed to ${currentUser.isBlocked ? 'unblock' : 'block'} user.`);
    }
  };

  const openModal = (user: User) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 font-semibold ">
            {currentUsers.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.username}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.phone ? user.phone : "Nill"}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className={`px-4 py-2 rounded transition ${user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                    onClick={() => openModal(user)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <BlockConfirmationModal
        show={showModal}
        onClose={closeModal}
        onConfirm={handleBlockUser}
        title={currentUser?.isBlocked ? 'Unblock User' : 'Block User'}
        message={`Are you sure you want to ${currentUser?.isBlocked ? 'unblock' : 'block'} ${currentUser?.username}?`}
      />
    </div>
  );
};

export default UserManagement;

