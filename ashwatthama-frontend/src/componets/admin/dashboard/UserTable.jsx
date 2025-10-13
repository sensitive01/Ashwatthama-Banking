import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";
import { Edit, Plus, Trash2, Eye, X, CheckCircle } from "lucide-react";
import {
  deleteUserData,
  getUserFormData,
} from "../../../api/service/adminServices";

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalMode, setModalMode] = useState("edit");
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUserFormData();
        if (response.status === 200) {
          // Filter only visible users
          const visibleUsers = response.data.data.filter(
            (user) => user.isVisible !== false
          );
          setUsers(visibleUsers);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewUser = (user) => {
    navigate(`/admin/view-users/${user._id}`);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteUserData(userToDelete._id);

      if (response.status === 200) {
        // Remove the deleted user from the list
        setUsers(users.filter((user) => user._id !== userToDelete._id));

        // Show success message
        setSuccessMessage(
          `User ${userToDelete.firstName} ${userToDelete.lastName} has been deleted successfully!`
        );
        setShowSuccessMessage(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const handleAddUser = () => {
    setSelectedUser({
      _id: null,
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      aadharNumber: "",
      addressLine: "",
      area: "",
      pincode: "",
      landmark: "",
      idProofNumber: "",
      idProofFile: "",
      addressProofNumber: "",
      addressProofFile: "",
      photoFile: "",
      nomineeContact: "",
      nomineeRelation: "",
      paymentProofFile: "",
    });
    setModalMode("add");
    setShowUserModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3">
              <CheckCircle size={24} />
              <span className="font-medium">{successMessage}</span>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="ml-4 hover:bg-green-700 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-purple-900 bg-opacity-95 backdrop-blur-xl rounded-2xl p-8 border border-purple-500 border-opacity-40 max-w-md w-full mx-4 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Confirm Delete
                </h3>
                <p className="text-purple-200 mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    {userToDelete?.firstName} {userToDelete?.lastName}
                  </span>
                  ? This action cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500 border-opacity-40">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-bold">All Users</h2>
            <button
              onClick={handleAddUser}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all"
            >
              <Plus size={20} />
              <span>Add User</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center text-purple-200 py-8">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="text-center text-purple-200 py-8">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500 border-opacity-40">
                    <th className="text-left text-purple-200 font-medium py-3 px-4">
                      Sl No
                    </th>
                    <th className="text-left text-purple-200 font-medium py-3 px-4">
                      User Name
                    </th>
                    <th className="text-left text-purple-200 font-medium py-3 px-4">
                      Email
                    </th>
                    <th className="text-left text-purple-200 font-medium py-3 px-4">
                      Mobile
                    </th>
                    <th className="text-left text-purple-200 font-medium py-3 px-4">
                      Created At
                    </th>
                    <th className="text-left text-purple-200 font-medium py-3 px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-purple-500 border-opacity-20 hover:bg-purple-800 hover:bg-opacity-30 transition-all"
                    >
                      <td className="py-4 px-4 text-purple-200">{index + 1}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">
                              {user.firstName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-white">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-purple-200">
                        {user.email}
                      </td>
                      <td className="py-4 px-4 text-purple-200">
                        {user.contactNumber}
                      </td>
                      <td className="py-4 px-4 text-purple-200">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserTable;
