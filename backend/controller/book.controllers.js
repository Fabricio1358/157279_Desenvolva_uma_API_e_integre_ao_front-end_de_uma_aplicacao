import bookService from '../service/book.services.js'

async function createBookController(request, resolve) { // POST /books
     const newBook = request.body

     try {
          const createdBook = await bookService.createBookService(newBook)
          resolve.status(201).send(createdBook)
     } catch (erro) {
          resolve.status(400).send(erro.message)
     }
}

async function findAllBooksController(request, resolve) { // GET /books
     try {
          const books = await bookService.findAllBooksService()
          resolve.send(books)
     } catch (erro) {
          resolve.status(404).send(erro.message)
     }
}

async function findBookByIdController(request, resolve) { // GET /books/:id
     const bookId = request.params.id

     try {
          const book = await bookService.findBookByIdService(bookId)
          return resolve.send({ book })
     } catch (erro) {
          return resolve.status(404).send(erro.message)
     }
}

async function updateBookController(request, resolve) { // PUT /books/:id
     const bookId = request.params.id
     const updatedBook = request.body
     const userId = request.userId

     try {
          const response = await bookService.updateBookService(updatedBook, bookId, userId)
          return resolve.status(200).send({ response })
     } catch (erro) {
          return resolve.status(400).send(erro.message)
     }
}

async function deleteBookController(request, resolve) { // DELETE /books/:id
     const bookId = request.params.id
     const userId = request.userId

     try {
          const response = await bookService.deleteBookService(bookId, userId)
          return resolve.status(200).send({ response })
     } catch (erro) {
          return resolve.status(400).send(erro.message)
     }
}

export default {
     createBookController,
     findAllBooksController,
     findBookByIdController,
     updateBookController,
     deleteBookController
}