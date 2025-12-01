import { axiosInstance } from "../axiosInstance/axiosInstance";

export const verifyAdminLogin = async (userEmail, userPassword) => {
  const response = await axiosInstance.post("/admin/admin-verification", {
    userEmail,
    userPassword,
  });
  return response;
};

export const getUserFormData = async () => {
  const response = await axiosInstance.get("/admin/get-user-form-data");
  return response;
};

export const getIndividualUserData = async (id) => {
  const response = await axiosInstance.get(`/admin/get-individual-user-data/${id}`);
  return response;
};

export const deleteUserData = async (id) => {
  const response = await axiosInstance.delete(`/admin/delete-user-data/${id}`);
  return response;
};

export const getAllEnquiries = async () => {
  const response = await axiosInstance.get(`/admin/get-all-enquiries`);
  return response;
};

export const deleteEnquiry = async (id) => {
  const response = await axiosInstance.delete(`/admin/delete-enquiry/${id}`);
  return response;
};