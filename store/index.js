import IndexRequest from "~/services/index.js";
export const state = () => ({
  posts: [],
  post: [],
  categories: [],
  adminCategories: [],
  setPostForm: "",
  postContent: "",
  setLoginForm: false,
  setRegisterForm: false,
  totalPage: 1,
  totalPostPage: 1,
  current_post_comment: [],
  totalCategory: 0,
  totalHomePageViews: 0,
  totalSinglePageViews: 0,
});

export const getter = {};

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_PAGE_NUMBER(state, pageNumber) {
    state.totalPage = pageNumber;
  },
  SET_POST(state, post) {
    state.post = post;
  },
  SET_SINGLE_POST_PAGE_NUMBER(state, totalPostPages) {
    state.totalPostPage = totalPostPages;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_ADMIN_CATEGORY(state, categories) {
    state.adminCategories = categories;
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

  SET_CURRENT_POST_COMMENT(state, comments) {
    state.current_post_comment = comments;
  },
  SET_PAGED_COMMENTS(state, comments) {
    state.current_post_comment = comments;
  },
  TOTAL_CATEGORIES(state, total) {
    state.totalCategory = total;
  },
  SET_SINGLE_PAGE_VIEW(state, total) {
    state.totalSinglePageViews = total;
  },
  SET_HOME_PAGE_VIEW(state, total) {
    state.totalHomePageViews = total;
  },
};

export const actions = {
  async getPosts({ commit }) {
    let posts = await IndexRequest.getPosts().then((res) => {
      commit("SET_POSTS", res.data.posts);
      commit("SET_PAGE_NUMBER", res.data.totalPages);
      commit("SET_HOME_PAGE_VIEW", res.data.pageViews);
    });

    return posts;
  },

  async getPostsByPage({ commit }, pageNumber) {
    let posts = await IndexRequest.getPostsByPage(pageNumber).then((res) => {
      commit("SET_POSTS", res.data.posts);
      commit("SET_PAGE_NUMBER", res.data.totalPages);
      commit("SET_HOME_PAGE_VIEW", res.data.pageViews);
    });
  },
  async getPost({ commit }, postId) {
    let post = await IndexRequest.getPost(postId).then((res) => {
      commit("SET_POST", res.data.post[0]);
      commit("SET_SINGLE_POST_PAGE_NUMBER", res.data.totalPostPages);
      commit("SET_SINGLE_PAGE_VIEW", res.data.pageViews);
    });
  },
  async getCategories({ commit }) {
    return IndexRequest.getCategories().then((res) => {
      commit("TOTAL_CATEGORIES", res.data.totalPage);
      commit("SET_CATEGORIES", res.data.category);
    });
  },
  async getPagedCategory({ commit }, page) {
    return IndexRequest.getPagedCategory(page).then((res) => {
      commit("SET_ADMIN_CATEGORY", res.data.category);
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

  //COMMENT ACTIONS

  async getCommentByPostId({ commit }, id) {
    return IndexRequest.getCommentByPostId(id).then((res) => {
      commit("SET_CURRENT_POST_COMMENT", res.data.comments);
    });
  },
  async getCommentByPage({ commit }, values) {
    return IndexRequest.getCommentByPage(values.id, values.page).then((res) => {
      // COMMIT THE COMMENT MUTATION
      commit("SET_PAGED_COMMENTS", res.data.comments);
    });
  },
};
