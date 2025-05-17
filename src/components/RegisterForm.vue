<template>
  <form @submit.prevent="submit">
    <label>
      Логин
      <input
        v-model="login"
        type="text"
        required
      />
    </label>
    <label>
      Почта
      <input
        v-model="email"
        type="email"
        required
      />
    </label>
    <label>
      Пароль
      <input
        v-model="password"
        type="password"
        required
      />
    </label>
    <label>
      Подтверждение пароля
      <input
        v-model="confirmPassword"
        type="password"
        required
      />
    </label>
    <label>
      Телефон
      <input
        v-model="phone"
        type="tel"
        required
        @input="formatPhone"
        placeholder="+7 (___) ___-__-__"
      />
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
let phone = ref('');

const errors = ref<Record<string, string>>({});

function formatPhone(e: Event) {
  const input = e.target as HTMLInputElement;
  let digits = input.value.replace(/\D/g, '');

  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1);
  } else if (!digits.startsWith('7')) {
    digits = '7' + digits;
  }

  digits = digits.slice(0, 11);

  let formatted = '+7';

  if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
  if (digits.length >= 4) formatted += `) ${digits.slice(4, 7)}`;
  if (digits.length >= 7) formatted += `-${digits.slice(7, 9)}`;
  if (digits.length >= 9) formatted += `-${digits.slice(9, 11)}`;

  phone.value = formatted;
}

function validate() {
  errors.value = {};
  if (!login.value || !/^[a-zA-Z0-9]{6,}$/.test(login.value))
    errors.value.login = 'Логин должен быть не менее 6 символов, используйте латиницу и цифры';

  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
    errors.value.email = 'Неверный формат электронной почты';

  if (!phone.value || !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone.value))
    errors.value.phone = 'Телефон не заполнен';

  if (password.value.length < 8)
    errors.value.password = 'Пароль должен быть не менее 8 символов, используйте латиницу, цифры или специальные символы';

  if (!confirmPassword.value || confirmPassword.value !== password.value)
    errors.value.confirmPassword = 'Пароли не совпадают';

  return Object.keys(errors.value).length === 0;
}

function submit() {
  if (!validate()) {
    console.error('registration errors:', errors.value);
    return
  }

  console.log('validation succeeded')
}

</script>

<style scoped>

</style>