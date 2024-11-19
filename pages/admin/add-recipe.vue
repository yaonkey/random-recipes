<template>
  <div v-if="isAuthenticated" class="container mx-auto mt-10">
    <h1 class="text-3xl font-bold text-center">Добавить новый рецепт</h1>
    <form @submit.prevent="submitForm" class="mt-8 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Название рецепта</label>
        <input
            v-model="title"
            type="text"
            id="title"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
        />
      </div>

      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">Описание рецепта</label>
        <textarea
            v-model="content"
            id="content"
            rows="4"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="imageUrl" class="block text-sm font-medium text-gray-700">Изображение рецепта (URL)</label>
        <input
            v-model="imageUrl"
            type="text"
            id="imageUrl"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
        />
      </div>

      <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Добавить рецепт
      </button>
    </form>

    <!-- Сообщение об успешном добавлении -->
    <p v-if="message" class="text-green-500 text-center mt-4">{{ message }}</p>
  </div>

  <div v-else class="flex justify-center items-center min-h-screen">
    <div class="p-6 bg-white shadow-lg rounded-md">
      <h2 class="text-2xl font-semibold mb-4">Введите пароль для доступа к админке</h2>
      <input
          v-model="password"
          type="password"
          class="p-2 border border-gray-300 rounded mb-4 w-full"
          @keydown.enter="authenticate"
      />
      <button
          @click="authenticate"
          class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Войти
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const password = ref('')
const title = ref('')
const content = ref('')
const imageUrl = ref('')
const isAuthenticated = ref(false)
const message = ref('')
const router = useRouter()

const authenticate = () => {
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD
  if (password.value === adminPassword) {
    isAuthenticated.value = true
  } else {
    alert('Неверный пароль')
  }
}

const submitForm = async () => {
  const newRecipe = {
    title: title.value,
    content: content.value,
    imageUrl: imageUrl.value,
  }

  try {
    const response = await fetch('/api/recipes/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    })

    if (response.ok) {
      // Очистка формы после успешного добавления
      title.value = ''
      content.value = ''
      imageUrl.value = ''
      message.value = 'Рецепт успешно добавлен!'
    } else {
      alert('Ошибка при добавлении рецепта')
    }
  } catch (error) {
    alert('Ошибка при подключении к серверу')
    console.error(error)
  }
}
</script>

<style scoped>
/* Стили для формы */
.container {
  max-width: 500px;
  margin: auto;
}
</style>
