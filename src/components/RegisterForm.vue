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
    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const login = ref('');
const password = ref('');
const email = ref('');

</script>

<style scoped>

</style>