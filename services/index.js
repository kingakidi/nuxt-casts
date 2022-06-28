import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  createUser() {
    return apiClient.post("/user");
  },
  getPosts() {
    return apiClient.get("/post");
  },
  getPostsByPage(pageNumber) {
    return apiClient.get(`/post?pageNumber=${pageNumber}`);
  },
  getPost(postId) {
    return apiClient.get(`/post/${postId}`);
  },
  getCategories() {
    return apiClient.get("/category");
  },
  getCategoryById(postId) {
    return apiClient.get(`/post/${postId}`);
  },

  postCategory(newCategory) {
    return apiClient.post("/category", newCategory);
  },
};
