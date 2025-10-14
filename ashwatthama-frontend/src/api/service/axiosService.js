import { axiosInstance } from "../axiosInstance/axiosInstance";

export const sendFormData = async (formData) => {
  const response = await axiosInstance.post("/user/send-form-data", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const userLoginVerification = async (
  loginType,
  Credentials,
  password
) => {
  const response = await axiosInstance.post(`/user/verify-login`, {
    loginType,
    Credentials,
    password,
  });
  return response;
};

export const getCustomerName = async (customerId) => {
  const response = await axiosInstance.get(
    `/user/get-customer-name/${customerId}`
  );
  return response;
};

export const customerChangePassword = async (
  customerId,
  currentPassword,
  newPassword
) => {
  const response = await axiosInstance.put(
    `/user/change-customer-password/${customerId}`,
    { currentPassword, newPassword }
  );
  return response;
};

export const customerFullData = async (customerId) => {
  const response = await axiosInstance.get(
    `/user/get-customer-full-data/${customerId}`
  );
  return response;
};

export const updateCustomerData = async (customerId, formData) => {
  const response = await axiosInstance.put(
    `/user/update-customer-full-data/${customerId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const candidateForgotPassowrd = async (identifierType, identifier) => {
  const response = await axiosInstance.post(`/user/send-otp-for-account-verification`, {
    identifierType,
    identifier,
  });
  return response;
};


export const verifyChangePasswordOtp = async (identifierType, identifier,otp) => {
  const response = await axiosInstance.post(`/user/verify-otp-for-account-verification`, {
    identifierType,
    identifier,
    otp
  });
  return response;
};

export const resetLoginPassword = async (identifierType, identifier,newPassword) => {
  const response = await axiosInstance.post(`/user/reset-password-for-account-login`, {
    identifierType,
    identifier,
    newPassword
  });
  return response;
};