import { apiClient } from "@/helper/commonHelper";

export const loginUser = (credentials) => {
  return apiClient.post("/auth/login", credentials);
};

export const registerUser = (formData) => {
  return apiClient.post("/auth/register", formData);
};

export const logoutUser = () => {
  return apiClient.post("/auth/logout");
};

export const get_user = (payload) => {
  return apiClient.post("/get_user", payload);
};