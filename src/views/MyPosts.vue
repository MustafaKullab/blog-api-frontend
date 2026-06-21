<template>
  <div
    class="MyPosts"
    style="
      background: linear-gradient(to right, #7f00ff, #e100ff);
      min-height: 100vh;
      padding-bottom: 30px;
    "
  >
    <div class="container">
      <div class="addPost">
        <div class="title py-4 text-center">
          <h1 class="my-0">Add New Post</h1>
        </div>
        <div class="backBtn">
          <button
            style="top: 20px"
            @click.prevent="router.go(-1)"
            class="btn btn-secondary position-absolute"
          >
            Back
          </button>
        </div>
        <form style="width: 60%" class="mx-auto" @submit.prevent="hanldeAddPost">
          <div class="mb-3">
            <label class="form-label text-light">Title : </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              class="form-control"
              v-model="title"
              :class="errorTitle ? ' is-invalid' : ''"
            />
            <div id="title" class="errorCode invalid-feedback fw-bold">{{ errorTitle }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label text-light">Content : </label>
            <textarea
              id="content"
              type="text"
              name="content"
              placeholder="Content"
              v-model="content"
              class="form-control"
              :class="errorContent ? ' is-invalid' : ''"
              style="resize: none; height: 150px"
            />
            <div id="content" class="errorCode invalid-feedback fw-bold">{{ errorContent }}</div>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label text-light">Select image</label>
            <input class="form-control" type="file" id="image" ref="imageSelected" />
          </div>
          <button class="btn btn-primary w-100">Add Post</button>
        </form>
      </div>
      <div class="MyPosts mt-5 mx-auto" style="width: 60%">
        <div
          class="post bg-light p-3 rounded mb-3"
          style="background: linear-gradient(to right, #00b4db, #0083b0)"
          v-for="post of posts"
          :key="post._id"
        >
          <div
            class="post-header d-flex justify-content-between align-items-center border-bottom pb-2"
          >
            <div class="avatar">
              <img
                :src="`http://localhost:8000/${post.userId.avatar}`"
                alt="avatar"
                class="img-fluid"
                style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover"
              />
            </div>
            <div class="username text-light">{{ post.userId.username }}</div>
          </div>
          <div class="post-body my-3">
            <div class="title">
              <h3 style="color: black">{{ post.title }}</h3>
              <p>{{ post.content }}</p>
            </div>
            <div class="image text-center w-100">
              <img :src="`http://localhost:8000/${post.image}`" class="img-fluid" alt="" />
            </div>
          </div>
          <div class="addComment">
            <h4 style="color: black">Add Comment</h4>
            <form @submit.prevent="addComment(`${post._id}`, post)">
              <input
                type="text"
                placeholder="New comment..."
                class="form-control comment"
                style="
                  background-color: #008ab6;
                  border-color: #00b4db;
                  color: white;
                  box-shadow: none;
                "
                v-model="contentComment"
              />
              <div class="errorEmptyComment text-danger fw-bold" v-if="post.errorEmptyMessage">
                {{ post.errorEmptyMessage }}
              </div>
              <div class="addComm text-center">
                <button class="btn w-50 mt-2" style="background-color: #106cb4; color: white">
                  Add comment
                </button>
              </div>
            </form>
          </div>
          <div class="displayComments py-3">
            <div
              class="comment border-top border-bottom border-dark py-2 d-flex justify-content-between align-items-center"
              v-for="comment of post.comment"
              :key="comment._id"
            >
              <div class="userDetails">
                <div class="image">
                  <img
                    style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover"
                    :src="`http://localhost:8000/${comment.userId.avatar}`"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="username">{{ comment.userId.username }}</div>
              </div>
              <div class="content flex-grow-1 ms-4">
                {{ comment.content }}
              </div>
              <div
                class="deleteComment btn btn-danger"
                @click.prevent="deleteComment(`${comment._id}`)"
              >
                Delete
              </div>
            </div>
          </div>
          <div class="actions d-flex justify-content-between align-items-center mt-4">
            <div class="updateBtn">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                :data-bs-target="`#${post._id}`"
              >
                Update post
              </button>
              <div
                class="modal fade"
                :id="post._id"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content" style="background: #0083b0">
                    <div class="modal-header" style="border-color: #006487">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-2">
                          <input
                            type="text"
                            placeholder="New title"
                            class="form-control updateTit"
                            style="
                              background-color: #006487;
                              border: none;
                              box-shadow: none;
                              color: white;
                            "
                            v-model="newTitle"
                          />
                        </div>
                        <div class="mb-2">
                          <textarea
                            type="text"
                            placeholder="New content"
                            class="form-control updateCont"
                            style="
                              background-color: #006487;
                              border: none;
                              box-shadow: none;
                              color: white;
                              resize: none;
                              height: 100px;
                            "
                            v-model="newContent"
                          />
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer" style="border-color: #006487">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click.prevent="updatePost(`${post._id}`)"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="deleteBtn">
              <button class="btn btn-danger" @click.prevent="deletePost(`${post._id}`)">
                Delete post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { useRouter } from "vue-router";

const router = useRouter();

// Variables to store the information of post
const title = ref("");
const content = ref("");
const imageSelected = ref(null);

// Variables to display error messages
const errorTitle = ref("");
const errorContent = ref("");

//Variable to store the posts of user
const posts = ref(null);

// Variables to display the new title or content
const newTitle = ref("");
const newContent = ref("");

// Variable to store the content of comment
const contentComment = ref("");

// Function to add new post
const hanldeAddPost = async () => {
  // Form Data
  const formData = new FormData();

  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("image", imageSelected.value.files[0]);
  try {
    const response = await fetchWithRefresh("http://localhost:8000/post", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();

    console.log(data);

    if (data.success) {
      location.reload();
    } else {
      errorTitle.value = data.errors.title;
      errorContent.value = data.errors.content;
    }
  } catch (error) {
    console.log("Something went error " + error);
  }
};

const fetchMyPosts = async () => {
  const response = await fetchWithRefresh("http://localhost:8000/myposts", {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();

  posts.value = data.posts;

  console.log(posts.value);
};

// Function to update the post
const updatePost = async (id) => {
  const response = await fetchWithRefresh(`http://localhost:8000/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({ newTitle: newTitle.value, newContent: newContent.value }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  console.log(data);

  if (data.success) {
    location.reload();
  }
};

// Function to delete the post
const deletePost = async (id) => {
  const response = await fetchWithRefresh(`http://localhost:8000/post/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    location.reload();
  } else {
    return;
  }
};

// Function to add new comment
const addComment = async (id, post) => {
  const response = await fetchWithRefresh("http://localhost:8000/postComment", {
    method: "POST",
    body: JSON.stringify({ content: contentComment.value, postId: id }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    location.reload();
  } else {
    post.errorEmptyMessage = data.errors.content;
  }
};

// Function to delete comment
const deleteComment = async (id) => {
  const response = await fetchWithRefresh(`http://localhost:8000/deleteComment/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    location.reload();
  }
};

onMounted(() => {
  fetchMyPosts();
});
</script>

<style lang="scss" scoped>
.comment::placeholder,
.updateTit::placeholder,
.updateCont::placeholder {
  color: white;
}

.post-body p {
  word-break: break-all;
}

@media (max-width: 767px) {
  .MyPosts,
  form {
    width: 100% !important;
  }
}
</style>
