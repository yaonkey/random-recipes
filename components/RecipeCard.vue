<template>
  <div class="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
    <div class="mb-4">
      <img :src="recipe.imageUrl" :alt="recipe.title" class="w-full h-64 object-cover rounded-lg" />
    </div>
    <h2 class="text-2xl font-bold mb-2 text-gray-800">{{ recipe.title }}</h2>
    <p class="text-gray-600 mb-4">{{ recipe.content }}</p>
    <button @click="onNextRecipe" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Далее
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  recipe: Object,
  onNextRecipe: Function,
})
</script>
