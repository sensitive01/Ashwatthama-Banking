import { axiosInstance } from "../axiosInstance/axiosInstance";


export const sendFormData = async (formData) => {
  const response = await axiosInstance.post('/user/send-form-data', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};