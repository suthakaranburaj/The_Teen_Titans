import { apiClient } from "@/helper/commonHelper";

export const get_question = (id) => {
  return apiClient.get(`/questions/${id}`);
};

export const vote = (formData)=>{
  return apiClient.post("/votes", formData);
}



// export const registerUser = (formData) => {
//   return apiClient.post("/auth/register", formData);
// };

// export const logoutUser = () => {
//   return apiClient.post("/auth/logout");
// };

// export const get_user = (payload) => {
//   return apiClient.post("/get_user", payload);
// };