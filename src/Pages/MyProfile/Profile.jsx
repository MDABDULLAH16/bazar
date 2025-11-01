import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Loading user profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          {/* User Photo */}
          <img
            src={user.photoURL || "https://i.ibb.co/2Fsfm9R/avatar.png"}
            alt="User"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mb-4"
          />

          {/* User Info */}
          <h2 className="text-2xl font-semibold dark:text-gray-100 mb-1">
            {user.displayName || "Anonymous User"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
            {user.email}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-700 w-full my-4"></div>

          {/* Additional Info */}
          <div className="w-full text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Email Verified:</span>
              <span className="text-green-500 font-semibold">
                {user.emailVerified ? "Yes ✅" : "No ❌"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">User ID:</span>
              <span className="truncate w-40 text-right">{user.uid}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Provider:</span>
              <span>{user.providerData[0]?.providerId}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => alert("Edit profile feature coming soon!")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
