<template>
  <form>
    <label>
      Логин
      <input v-model="login" type="text" required />
    </label>
    <label>
      Почта
      <input v-model="email" type="email" required />
    </label>
    <label>
      Пароль
      <input v-model="password" type="password" required />
    </label>
    <label>
      Подтверждение пароля
      <input v-model="confirmPassword" type="password" required />
    </label>
    <label>
      Телефон
      <input v-model="phone" type="tel" required />
    </label>
    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const login = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const phone = ref('');

</script>

<style scoped>

</style>