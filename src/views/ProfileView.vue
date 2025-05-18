<template>
  <main class="profile-view">
    <span class="title">Здравствуйте, {{ login }}</span>
    <div class="line"></div>
    <a href="/" class="quit" v-on:click="logout">Выход</a>
  </main>
</template>

<script lang="ts" setup>
import type { User } from '@/stores/userStore';

const userCredsRaw = localStorage.getItem('user')
const userCreds: User | null = userCredsRaw ? JSON.parse(userCredsRaw) : null;
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
  gap: 25px;

  @media screen and (max-width: 768px) {
  width: auto;
  height: 100%;
  justify-content: start;
}
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

.line {
  border-bottom: 1px solid #f2f2f2;
  width: 100%;
}
</style>
