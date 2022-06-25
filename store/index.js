import IndexRequest from "~/services/index.js";
export const state = () => ({
  posts: [],
  post: [],
  categories: [],
  setPostForm: "",
  postContent: "",
  setLoginForm: false,
  setRegisterForm: false,
});

export const getter = {};

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },

  SET_POST(state, post) {
    state.post = post;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_POST_FORM(state, postStatus) {
    state.setPostForm = postStatus;
  },
  REMOVE_POST_FORM(state) {
    state.setPostForm = false;
  },
  SET_POST_CONTENT(state, post) {
    state.postContent = post;
  },
  SET_LOGIN_FORM(state, loginFormState) {
    state.setLoginForm = loginFormState;
  },
  SET_REGISTER_FORM(state, registerFormState) {
    state.setRegisterForm = registerFormState;
  },
};

export const actions = {
  async getPosts({ commit }) {
    let posts = await IndexRequest.getPosts().then((res) => {
      commit("SET_POSTS", res.data);
    });

    return posts;
  },
  async getPost({ commit }, postId) {
    let post = await IndexRequest.getPost(postId).then((res) => {
      commit("SET_POST", res.data);
    });
  },
  async getCategories({ commit }) {
    return IndexRequest.getCategories().then((res) => {
      commit("SET_CATEGORIES", res.data);
    });
  },
  async postCategory({ commit, state }, category) {
    return IndexRequest.postCategory(category).then((res) => {
      return res;
    });
  },
  setPostForm({ commit }, status) {
    commit("SET_POST_FORM", status);
  },
  setLoginForm({ commit }, formState) {
    commit("SET_LOGIN_FORM", formState);
  },
  setRegisterForm({ commit }, formState) {
    commit("SET_REGISTER_FORM", formState);
  },
  removePostForm({ commit }) {
    commit("REMOVE_POST_FORM");
  },
  setPostConent({ commit }, postContent) {
    commit("SET_POST_CONTENT", postContent);
  },
};
