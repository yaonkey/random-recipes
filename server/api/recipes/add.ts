import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // Получение данных из тела запроса
    const body = await readBody(event)

    const { title, content, imageUrl } = body

    // Проверка данных
    if (!title || !content || !imageUrl) {
        return { statusCode: 400, message: 'Не все поля заполнены' }
    }

    try {
        // Создание нового рецепта в базе данных через Prisma
        const newRecipe = await prisma.recipe.create({
            data: {
                title,
                content,
                imageUrl,
            },
        })

        return { statusCode: 201, recipe: newRecipe }
    } catch (error) {
        return { statusCode: 500, message: 'Ошибка при добавлении рецепта' }
    }
})
