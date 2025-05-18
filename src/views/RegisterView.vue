<template>
  <main class="register-view">
    <span class="title">Регистрация</span>
    <RegisterForm />
  </main>
</template>

<script lang="ts" setup>
import RegisterForm from '../components/RegisterForm.vue'
</script>

<style scoped>
.register-view {
  width: 615px;
  height: 700px;
  align-items: center;
  justify-content: center;
  background-color: #fffffe;
  padding: 42px;
}

.title {
  font-weight: 500;
  font-size: 40px;
  display: block;
  margin-bottom: 24px;
}
</style>
