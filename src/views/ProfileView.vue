<template>
  <main class="profile-view">
    <span class="title">Здравствуйте, {{ login }}</span>
    <a href="/" class="quit" v-on:click="logout">Выход</a>
  </main>
</template>

<script lang="ts" setup>
const userCreds = JSON.parse(localStorage.getItem('user'))
const login = userCreds?.login

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
}
</script>

<style scoped>
.profile-view {
  width: 615px;
  height: 220px;
  align-items: center;
  justify-content: center;
  background-color: #fffffe;
  padding: 42px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 57px;
}

.title {
  font-weight: 500;
  font-size: 40px;
  display: block;
  margin-bottom: 24px;
}

.quit {
  text-decoration: underline;
  text-underline-offset: 3px;
  color: #2b2a29
}
</style>
