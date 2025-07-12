import { apiClient } from "@/helper/commonHelper";

export const get_question_answers = (id,params) => {
  return apiClient.get(`/answers/questions/${id}`, {
    params: { ...params }
  });
};

export const create_answer = (formData) => {
  return apiClient.post("/answers", formData);
};
// export const registerUser = (formData) => {
//   return apiClient.post("/auth/register", formData);
// };

// export const logoutUser = () => {
//   return apiClient.post("/auth/logout");
// };

// export const get_user = (payload) => {
//   return apiClient.post("/get_user", payload);
// };