import { apiClient } from "@/helper/commonHelper";

export const loginUser = (credentials) => {
  return apiClient.post("/auth/login", credentials);
};

export const registerUser = (formData) => {
  const data = new FormData();
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("avatar", formData.avatar);

  return apiClient.post("/auth/register", data);
};

export const logoutUser = () => {
  return apiClient.post("/auth/logout");
};

export const get_user = (payload) => {
  return apiClient.post("/get_user", payload);
};