import { useEffect, useState } from 'react';
import { LivrosService } from '../../api/LivrosService.js';

function ListaLivros() {
     const [livros, setLivros] = useState([]);

     useEffect(() => {
          LivrosService.getLivros().then(res => setLivros(res.data));
     }, []);

     return (
          <ul className='livros'>
               {livros.map(livro => (
                    <li key={livro.id}>
                         {livro.titulo} - {livro.paginas} páginas - ISBN: {livro.isbn} - Editora: {livro.editora}
                    </li>
               ))}
          </ul>
     );
}

export default ListaLivros;
