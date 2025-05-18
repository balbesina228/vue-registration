<template>
  <main class="register-view">
    <span class="title">Регистрация</span>
    <RegisterForm @onSuccess="handleSuccess"/>
  </main>
</template>

<script lang="ts" setup>
import RegisterForm from '../components/RegisterForm.vue'
import { useRouter } from 'vue-router';

const router = useRouter();
function handleSuccess() {
  router.push('/profile');
}
</script>

<style scoped>
.register-view {
  width: 615px;
  height: 600px;
  align-items: center;
  justify-content: center;
  background-color: #fffffe;
  padding: 42px;

  @media screen and (max-width: 768px) {
    width: auto;
    height: 100%;
  }
}

.title {
  font-weight: 500;
  font-size: 40px;
  display: block;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
}
</style>
