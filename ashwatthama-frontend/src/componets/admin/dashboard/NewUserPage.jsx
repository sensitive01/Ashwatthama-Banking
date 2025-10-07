import React from "react";

const NewUserPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500 border-opacity-40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">
            Pending User Approvals
          </h2>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all">
            Approve All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-500 border-opacity-40">
                <th className="text-left text-purple-200 font-medium py-3 px-4">
                  Name
                </th>
                <th className="text-left text-purple-200 font-medium py-3 px-4">
                  Email
                </th>
                <th className="text-left text-purple-200 font-medium py-3 px-4">
                  Date
                </th>
                <th className="text-left text-purple-200 font-medium py-3 px-4">
                  Status
                </th>
                <th className="text-left text-purple-200 font-medium py-3 px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr
                  key={item}
                  className="border-b border-purple-500 border-opacity-20 hover:bg-purple-800 hover:bg-opacity-30 transition-all"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">U{item}</span>
                      </div>
                      <span className="text-white">User {item}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-purple-200">
                    user{item}@example.com
                  </td>
                  <td className="py-4 px-4 text-purple-200">
                    Oct {item}, 2025
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-300 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-all">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-all">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewUserPage;
