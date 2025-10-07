import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIndividualUserData } from "../../../api/service/adminServices";

const UserModal = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getIndividualUserData(id);

        if (response.status===200) {
          setUserData(response.data.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600">No user data found</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={userData.photoFile}
                  alt={`${userData.firstName} ${userData.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-blue-100 mt-1">{userData.email}</p>
                <p className="text-blue-100">{userData.contactNumber}</p>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <InfoRow label="First Name" value={userData.firstName} />
                  <InfoRow label="Last Name" value={userData.lastName} />
                  <InfoRow label="Email" value={userData.email} />
                  <InfoRow
                    label="Contact Number"
                    value={userData.contactNumber}
                  />
                  <InfoRow
                    label="Aadhar Number"
                    value={userData.aadharNumber}
                  />
                  <InfoRow
                    label="ID Proof Number"
                    value={userData.idProofNumber}
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
                  Address Information
                </h2>
                <div className="space-y-3">
                  <InfoRow label="Address Line" value={userData.addressLine} />
                  <InfoRow label="Area" value={userData.area} />
                  <InfoRow label="Pincode" value={userData.pincode} />
                  <InfoRow label="Landmark" value={userData.landmark} />
                  <InfoRow
                    label="Address Proof Number"
                    value={userData.addressProofNumber}
                  />
                </div>
              </div>

              {/* Nominee Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
                  Nominee Information
                </h2>
                <div className="space-y-3">
                  <InfoRow
                    label="Nominee Contact"
                    value={userData.nomineeContact}
                  />
                  <InfoRow
                    label="Nominee Relation"
                    value={userData.nomineeRelation}
                  />
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
                  Account Information
                </h2>
                <div className="space-y-3">
                  <InfoRow label="User ID" value={userData._id} />
                  <InfoRow
                    label="Created At"
                    value={formatDate(userData.createdAt)}
                  />
                  <InfoRow
                    label="Updated At"
                    value={formatDate(userData.updatedAt)}
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2 mb-6">
                Uploaded Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DocumentCard
                  title="ID Proof"
                  imageUrl={userData.idProofFile}
                />
                <DocumentCard
                  title="Address Proof"
                  imageUrl={userData.addressProofFile}
                />
                <DocumentCard title="Photo" imageUrl={userData.photoFile} />
                <DocumentCard
                  title="Payment Proof"
                  imageUrl={userData.paymentProofFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-900 text-right">{value || "N/A"}</span>
  </div>
);

const DocumentCard = ({ title, imageUrl }) => (
  <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
    <div className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold">
      {title}
    </div>
    <div className="p-4">
      <a
        href={imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded hover:opacity-90 transition-opacity"
        />
      </a>
      <a
        href={imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        View Full Image
      </a>
    </div>
  </div>
);

export default UserModal;
