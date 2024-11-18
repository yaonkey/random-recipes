import { ref } from 'vue'

export const useRecipes = () => {
    const recipe = ref(null)

    const getRandomRecipe = async () => {
        const response = await fetch('/api/recipes/random')
        const data = await response.json()
        recipe.value = data
        return data
    }

    return {
        recipe,
        getRandomRecipe,
    }
}
