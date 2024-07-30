// src/pages/ProfileDetails.tsx

import React from 'react';

interface ProfileDetailsProps {
    user: { username: string; phone: string; email: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isFormDirty: () => boolean;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user, handleInputChange, handleSubmit, isFormDirty }) => (
    <>
        <h2 className="text-2xl font-bold mb-4">About me</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700">Username</label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2 mt-1"
                />
            </div>
            <div>
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly
                    className="w-full border rounded p-2 mt-1"
                />
            </div>
            <div>
                <label className="block text-gray-700">Phone number</label>
                <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2 mt-1"
                />
            </div>
            <div className="mt-6 flex space-x-4">
                <button type="submit" className={`bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800 ${isFormDirty() ? '' : 'hidden'}`}>
                    Save Changes
                </button>
            </div>
        </form>
    </>
);

export default ProfileDetails;
