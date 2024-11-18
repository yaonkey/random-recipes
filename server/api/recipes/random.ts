import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const count = await prisma.recipe.count()
    const randomIndex = Math.floor(Math.random() * count)
    const randomRecipe = await prisma.recipe.findMany({
        take: 1,
        skip: randomIndex,
    })
    return randomRecipe[0] || { error: 'Рецепты не найдены' }
})
