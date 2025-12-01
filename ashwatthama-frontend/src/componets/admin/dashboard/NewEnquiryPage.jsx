import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import { Eye, Trash2, Mail, Phone, Calendar, MessageSquare, X } from "lucide-react";

import { toast } from "react-toastify";
import { deleteEnquiry, getAllEnquiries } from "../../../api/service/adminServices";

// Create a portal for the modal to escape parent stacking contexts
const ModalPortal = ({ children }) => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;
    return createPortal(children, modalRoot);
};

const NewEnquiryPage = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const response = await getAllEnquiries();
            if (response.status === 200) {
                setEnquiries(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching enquiries:", error);
            toast.error("Failed to fetch enquiries");
        } finally {
            setLoading(false);
        }
    };

    const handleViewEnquiry = (enquiry) => {
        console.log("Selected Enquiry:", enquiry); // For debugging
        setSelectedEnquiry(enquiry);
        setShowModal(true);
    };

    const handleDeleteEnquiry = async (id) => {
        if (window.confirm("Are you sure you want to delete this enquiry?")) {
            try {
                const response = await deleteEnquiry(id);
                if (response.status === 200) {
                    toast.success("Enquiry deleted successfully");
                    fetchEnquiries();
                }
            } catch (error) {
                console.error("Error deleting enquiry:", error);
                toast.error("Failed to delete enquiry");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-white text-xl">Loading enquiries...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-xl p-6 border border-purple-500 border-opacity-40">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-200 text-sm">Total Enquiries</p>
                            <p className="text-white text-3xl font-bold mt-2">{enquiries.length}</p>
                        </div>
                        <MessageSquare size={40} className="text-blue-400" />
                    </div>
                </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-xl border border-purple-500 border-opacity-40 overflow-hidden">
                <div className="p-6 border-b border-purple-500 border-opacity-40">
                    <h2 className="text-white text-xl font-bold">All Enquiries</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-purple-800 bg-opacity-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-purple-200 font-medium">#</th>
                                <th className="px-6 py-4 text-left text-purple-200 font-medium">Name</th>
                                <th className="px-6 py-4 text-left text-purple-200 font-medium">Email</th>
                                <th className="px-6 py-4 text-left text-purple-200 font-medium">Phone</th>
                                <th className="px-6 py-4 text-left text-purple-200 font-medium">Subject</th>
                                <th className="px-6 py-4 text-left text-purple-200 font-medium">Date</th>
                                <th className="px-6 py-4 text-left text-purple-200 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-purple-200">
                                        No enquiries found
                                    </td>
                                </tr>
                            ) : (
                                enquiries.map((enquiry, index) => (
                                    <tr
                                        key={enquiry._id}
                                        className="border-b border-purple-500 border-opacity-20 hover:bg-purple-800 hover:bg-opacity-30 transition-all"
                                    >
                                        <td className="px-6 py-4 text-white">{index + 1}</td>
                                        <td className="px-6 py-4 text-white">{enquiry?.name || 'N/A'}</td>
                                        <td className="px-6 py-4 text-purple-200">{enquiry?.email || 'N/A'}</td>
                                        <td className="px-6 py-4 text-purple-200">{enquiry?.phone || 'N/A'}</td>
                                        <td className="px-6 py-4 text-purple-200">{enquiry?.subject || "N/A"}</td>
                                        <td className="px-6 py-4 text-purple-200">
                                            {enquiry?.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewEnquiry(enquiry)}
                                                    className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} className="text-white" />
                                                </button>
                                                {/* <button
                                                    onClick={() => handleDeleteEnquiry(enquiry._id)}
                                                    className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} className="text-white" />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Enquiry Modal */}
            {showModal && selectedEnquiry && (
                <ModalPortal>
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <div
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl border border-purple-400 border-opacity-30 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 z-10 p-6 bg-purple-900 border-b border-purple-500 border-opacity-40 flex justify-between items-center">
                                <h2 className="text-white text-xl font-bold">Enquiry Details</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-purple-200 hover:text-white p-1 hover:bg-purple-800 rounded-full"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-purple-200 text-sm mb-1">Name</p>
                                        <p className="text-white font-medium">{selectedEnquiry?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-purple-200 text-sm mb-1">Email</p>
                                        <p className="text-purple-200">{selectedEnquiry?.email || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-purple-200 text-sm mb-1">Phone</p>
                                        <p className="text-purple-200">{selectedEnquiry?.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-purple-200 text-sm mb-1">Date</p>
                                        <p className="text-white font-medium">
                                            {selectedEnquiry?.createdAt ? new Date(selectedEnquiry.createdAt).toLocaleString() : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-purple-200 text-sm mb-1">Subject</p>
                                    <p className="text-purple-200">{selectedEnquiry?.subject || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-purple-200 text-sm mb-1">Message</p>
                                    <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedEnquiry?.message || 'No message provided'}</p>
                                </div>
                            </div>

                            <div className="sticky bottom-0 p-6 bg-purple-900 border-t border-purple-500 border-opacity-40">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalPortal>
            )}
        </div>
    );
};

export default NewEnquiryPage;