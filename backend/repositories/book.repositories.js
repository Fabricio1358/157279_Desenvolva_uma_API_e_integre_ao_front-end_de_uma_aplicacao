import db from '../config/database.js'

db.run(`
          CREATE TABLE IF NOT EXISTS books (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               title TEXT NOT NULL,
               author TEXT NOT NULL
          )
     `
)

function createBookRepository(newBook) {
     return new Promise((resolve, reject) => {
          const { title, author } = newBook
          db.run(
               `
                    INSERT INTO books (title, author)
                    VALUES (?, ?)
               `,
               [title, author],
               function (err) {
                    if (err) {
                         reject(err)
                    } else {
                         resolve({ id: this.lastID, ...newBook })
                    }
               }
          )
     })
}

function findAllBooksRepository() {
     return new Promise((resolve, reject) => {
          db.all(
               `
               SELECT * FROM books
               `,
               [],
               (err, rows) => {
                    if (err) {
                         reject(err)
                    } else {
                         resolve(rows)
                    }
               }
          )

     })
}

function findBookByIdRepository(bookId) {
     return new Promise((resolve, reject) => {
          db.get(`SELECT * FROM books WHERE id = ?`,
               [bookId], (err, row) => {
                    if (err) {
                         reject(err)
                    } else {
                         resolve(row)
                    }
               })
     })
}

function updateBookRepository(updatedBook, bookId) {
     return new Promise((resolve, reject) => {
          const fields = ['title', 'author'];
          let query = 'UPDATE books SET';
          const values = [];

          fields.forEach(field => {
               if (updatedBook[field] !== undefined) {
                    query += ` ${field} = ?,`;
                    values.push(updatedBook[field]);
               }
          });

          query = query.slice(0, -1); // Remove a última vírgula
          query += ' WHERE id = ?';
          values.push(bookId);

          db.run(query, values, (err) => {
               if (err) {
                    reject(err);
               } else {
                    resolve({ ...updatedBook, bookId });
               }
          });
     });
}

async function deleteBookRepository(bookId) {
     return new Promise((resolve, reject) => {
          db.run(
               `
                    DELETE FROM books
                    WHERE id = ?
               `,
               [bookId],
               (err) => {
                    if (err) {
                         reject(err);
                    } else {
                         resolve({ message: "Book deleted successfully", bookId });
                    }
               }
          );
     });
}

export default {
     createBookRepository,
     findAllBooksRepository,
     findBookByIdRepository,
     updateBookRepository,
     deleteBookRepository
}