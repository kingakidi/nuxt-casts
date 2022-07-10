import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://www.precastnaija.com/cast_api/public/api",
  withCredentials: true,
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
  getCategoryPosts(id) {
    return apiClient.get(`/post/category/${id}`);
  },
  getPostsByPage(pageNumber) {
    return apiClient.get(`/post?pageNumber=${pageNumber}`);
  },
  getCategoryPaged(id, pageNumber) {
    return apiClient.get(`/post/category/${id}?pageNumber=${pageNumber}`);
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

  getCommentByPostId(id) {
    return apiClient.get(`/comment/post/${id}`);
  },
  getCommentByPage(postId, page) {
    return apiClient.get(`/comment/post/${postId}?page=${page}`);
  },
  getCategoryByPage(postId, page) {
    return apiClient.get(`/comment/post/${postId}?page=${page}`);
  },
  getPagedCategory(page) {
    return apiClient.get(`/category/c/paged?page=${page}`);
  },
};
