import { User, UserPlus } from "lucide-react";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500 border-opacity-40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">Total Users</p>
              <h3 className="text-white text-3xl font-bold mt-2">1,234</h3>
              <p className="text-green-400 text-xs mt-2">
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500 border-opacity-40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">New Users</p>
              <h3 className="text-white text-3xl font-bold mt-2">89</h3>
              <p className="text-green-400 text-xs mt-2">+5% from last week</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <UserPlus size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500 border-opacity-40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">Total Balance</p>
              <h3 className="text-white text-3xl font-bold mt-2">$2.4M</h3>
              <p className="text-green-400 text-xs mt-2">+8% from last month</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">$</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500 border-opacity-40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">Transactions</p>
              <h3 className="text-white text-3xl font-bold mt-2">567</h3>
              <p className="text-green-400 text-xs mt-2">+15% from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">↔</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500 border-opacity-40">
        <h2 className="text-white text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 bg-purple-800 bg-opacity-30 rounded-xl hover:bg-opacity-50 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    User #{item} registered
                  </p>
                  <p className="text-purple-200 text-sm">{item} minutes ago</p>
                </div>
              </div>
              <span className="text-green-400 text-sm font-medium">New</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
