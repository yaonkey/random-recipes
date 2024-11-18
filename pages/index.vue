<template>
  <div class="min-h-screen bg-black flex items-center justify-center">
    <RecipeCard v-if="recipe" :recipe="recipe" :onNextRecipe="fetchRandomRecipe" />
    <p v-else>Загрузка...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { useRecipes } from '~/composables/useRecipes'

const recipe = ref(null)
const fetchRandomRecipe = async () => {
  recipe.value = await useRecipes().getRandomRecipe()
}

onMounted(fetchRandomRecipe)
</script>
