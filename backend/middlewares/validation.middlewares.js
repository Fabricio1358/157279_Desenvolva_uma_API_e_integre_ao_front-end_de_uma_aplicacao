import { bookIdSchema } from "../schema/book.schema.js"

const validate = (schema) => (request, resolve, next) => {
     try {
          schema.parse(request.body)
          next()
     } catch (erro) {
          resolve.status(400).json({ error: erro.errors })
     }
}

const validateBookId = (request, resolve, next) => {
     try {
          bookIdSchema.parse({ bookId: +request.params.id })
          next()
     } catch (erro) {
          resolve.status(400).json({ error: erro.errors })
     }
}

export { validate, validateBookId }