import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/homePage",
    },
    {
      name: "signup",
      path: "/signup",
      component: () => import("@/views/SignUp.vue"),
      meta: {
        title: "Sign Up",
      },
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/LogIn.vue"),
      meta: {
        title: "Log In",
      },
    },
    {
      name: "verify",
      path: "/verify/:userId",
      component: () => import("@/views/VerifyPage.vue"),
      meta: {
        title: "Verify Code",
      },
    },
    {
      name: "homePage",
      path: "/homePage",
      component: () => import("@/views/HomePage.vue"),
      meta: {
        title: "Home Page",
      },
    },
    {
      name: "forgotPassword",
      path: "/forgotPassword",
      component: () => import("@/views/ForgotPassword.vue"),
      meta: {
        title: "Forgot Password",
      },
    },
    {
      name: "resetPassword",
      path: "/resetPassword/:userId",
      component: () => import("@/views/ResetPassword.vue"),
      meta: {
        title: "Reset Password",
      },
    },
    {
      name: "myposts",
      path: "/myposts",
      component: () => import("@/views/MyPosts.vue"),
      meta: {
        title: "My Posts",
      },
    },
    {
      name: "allposts",
      path: "/allposts",
      component: () => import("@/views/AllPosts.vue"),
      meta: {
        title: "All Posts",
      },
    },
  ],
});

//Change the title of page
router.beforeEach((to) => {
  document.title = to.meta.title;
});

export default router;
