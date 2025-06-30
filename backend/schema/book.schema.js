import { z } from "zod";

const bookSchema = z.object({
     titulo: z.string().min(1, 'Título é obrigatório'),
     paginas: z.number().min(1, 'Número de páginas é obrigatório'),
     isbn: z.string().min(1, 'ISBN é obrigatório'),
     editora: z.string().min(1, 'Editora é obrigatória'),
})

const bookIdSchema = z.object({
     bookId: z.number().int().positive('ID do livro deve ser um número inteiro positivo')
})

export { bookSchema, bookIdSchema }