export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "server",
  head: {
    title: "Precast Naija",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/static/css/style.css", "ant-design-vue/dist/antd.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/antd-ui", "~/plugins/axios"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-material-design-icons-iconfont",
    "@nuxtjs/auth-next",
    "@nuxtjs/moment",
    "@nuxtjs/google-analytics",
  ],
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  //   baseURL: "https://www.precastnaija.com/cast_api/public/api",
  // },
  axios: {
    withCredentials: true,
    baseURL: process.env.API_URL,
  },
  proxy: {
    "/laravel": {
      target: "https://laravel-auth.nuxtjs.app",
      pathRewrite: { "^/laravel": "/" },
    },
  },
  auth: {
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "https://sydeestack.com/api/public",
        endpoints: {
          login: { url: "/api/login", method: "post" },
          logout: { url: "/api/logout", method: "post" },
        },
      },
      local: {
        endpoints: {
          login: { url: "login", method: "post" },
          logout: { url: "/logout", method: "post" },
          user: { url: "/login", method: "post" },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
