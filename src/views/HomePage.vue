<template>
  <div class="HomePage vh-100" style="background: linear-gradient(to right, #2193b0, #6dd5ed)">
    <div class="container d-flex flex-column h-100">
      <div class="navbar">
        <div class="title text-light">
          <h2>Blog API</h2>
        </div>
        <div class="links d-flex gap-2 align-items-center">
          <router-link class="btn btn-primary" :to="{ name: 'login' }" v-if="!user"
            >Login</router-link
          >
          <router-link class="btn btn-secondary" :to="{ name: 'signup' }" v-if="!user"
            >Signup</router-link
          >
          <button class="btn btn-danger" @click.prevent="logoutMethod">Logout</button>
        </div>
      </div>
      <div class="content d-flex flex-column justify-content-center flex-grow-1 text-light">
        <h1>Powerful APIs for Modern Blogs.</h1>
        <h3>Build, manage, and scale your content instantly.</h3>
        <div class="links d-flex gap-2 align-items-center mt-2">
          <router-link class="btn btn-info" :to="{ name: 'allposts' }" @click.prevent="checkUser"
            >All Posts</router-link
          >
          <router-link class="btn btn-primary" :to="{ name: 'myposts' }" @click.prevent="checkUser"
            >My Posts</router-link
          >
        </div>
      </div>
      <div class="footer d-flex align-items-center justify-content-between py-4">
        <div class="left">Simple. Fast. Reliable.</div>
        <div class="right">BlogAPI &copy;{{ new Date().getFullYear() }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";

let user = ref(null);

const getUser = async () => {
  const response = await fetchWithRefresh("http://localhost:8000/currentUser", {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();

  user.value = data.user;
};

const checkUser = () => {
  if (!user.value) {
    location.assign("/login");
  }
};

// Function to logout user
const logoutMethod = async () => {
  const response = await fetchWithRefresh("http://localhost:8000/logout", {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  console.log(data);

  if (data.success) {
    location.assign("/login");
  }
};

onMounted(() => {
  getUser();
});
</script>
