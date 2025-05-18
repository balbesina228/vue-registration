<template>
  <form @submit.prevent="submit">
    <label>
      Логин*
      <input
        v-model="login"
        type="text"
        :class="{ 'error-color': errors.login }"
      />
      <span class="error-color error-font" v-if="errors.login">
        Логин должен быть не менее 6 символов, используйте латиницу и цифры
      </span>
    </label>
    <label>
      E-mail
      <input
        v-model="email"
        type="email"
        :class="{ 'error-color': errors.email }"
      />
      <span class="error-color error-font" v-if="errors.email">
        Неверный формат электронной почты
      </span>
    </label>
    <label>
      Телефон
      <input
        v-model="phone"
        type="tel"
        @input="formatPhone"
        placeholder="+7 (___) ___-__-__"
        :class="{ 'error-color': errors.phone }"
      />
      <span class="error-color error-font" v-if="errors.phone">
        Телефон не заполнен
      </span>
    </label>
    <label>
      Пароль*
      <div class="password-container" :class="{ 'error-color': errors.confirmPassword }">
        <input
          v-model="password"
          :type="visiblePass? 'text' : 'password'"
          :class="{ 'error-color': errors.password }"
        />
        <button type="button" class="visible-btn" @click="visiblePass = !visiblePass">
          <EyeOn v-if="visiblePass" />
          <EyeOff v-else />
        </button>
      </div>
      <span class="error-color error-font" v-if="errors.password">
        Пароль должен быть не менее 6 символов, используйте латиницу, цифры или специальные символы
      </span>
    </label>
    <label>
      Повторить пароль*
      <div class="password-container" :class="{ 'error-color': errors.confirmPassword }">
        <input
          v-model="confirmPassword"
          :type="visibleConfirmPass ? 'text' : 'password'"
          :class="{ 'error-color': errors.confirmPassword }"
        />
        <button type="button" class="visible-btn" @click="visibleConfirmPass = !visibleConfirmPass">
          <EyeOn v-if="visibleConfirmPass" />
          <EyeOff v-else />
        </button>
      </div>
      <span class="error-color error-font" v-if="errors.confirmPassword">
        Пароли не совпадают
      </span>
    </label>
    <button type="submit" class="reg-btn">Зарегистрироваться</button>
    <div class="politics-line"></div>
    <span class="politics">
      Нажимая кнопку "Зарегистрироваться", пользователь соглашается с политикой в отношении обработки персональных данных и публичной офертой
    </span>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EyeOff from './icons/icon-eye-off.vue';
import EyeOn from './icons/icon-eye-on.vue'
import { useUserStore } from '@/stores/userStore';

const login = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
let phone = ref('');

const visiblePass = ref(false);
const visibleConfirmPass = ref(false);

const emit = defineEmits(['onSuccess']);

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

  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
    errors.value.email = 'Неверный формат электронной почты';

  if (phone.value && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone.value))
    errors.value.phone = 'Телефон не заполнен';

  if (password.value.length < 6)
    errors.value.password = 'Пароль должен быть не менее 6 символов, используйте латиницу, цифры или специальные символы';

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
  const userStore = useUserStore();
  userStore.login({ login: login.value, email: email.value, phone: phone.value });
  emit('onSuccess');
}

</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.reg-btn {
  width: auto;
  height: 50px;
  padding: 16px 32px;
  color: #ffffff;
  background-color: #2b2a29;
  margin: 22px 0px;
}

.visible-btn {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

input {
  border: 0px;
  border-bottom: 1px solid;
  outline: none;
  line-height: 34px;
  flex: 1;
  font-family: inherit;
}

.password-container {
  display: flex;
  border-bottom: 1px solid;

  input {
    border: none;
  }
}

.politics-line {
  border-bottom: 1px solid #f2f2f2;
}

.politics {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #878787;
}

.error-color {
  color: #D60303;
}

.error-font {
  margin-top: 4px;
  font-size: 14px;
}
</style>
