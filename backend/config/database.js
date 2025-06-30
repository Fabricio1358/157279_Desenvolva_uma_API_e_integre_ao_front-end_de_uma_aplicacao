import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('library_db.sqlite', (erro) => {
     if (erro) {
          console.log("Erro ao conectar ao banco de dados: ", erro.message)
     } else {
          console.log("Conectado com sucesso ao banco de dados SQLite!")
     }
})

export default db