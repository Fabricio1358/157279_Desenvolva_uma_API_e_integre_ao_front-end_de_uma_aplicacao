import { useEffect, useState } from 'react';
import { LivrosService } from '../../api/LivrosService.js';

function ListaLivros() {
     const [livros, setLivros] = useState([]);

     useEffect(() => {
          LivrosService.getLivros().then(res => setLivros(res.data));
     }, []);

     return (
          <ul>
               {livros.map(livro => (
                    <li key={livro.id}>
                         {livro.titulo} - {livro.paginas} páginas - ISBN: {livro.ISBN} - Editora: {livro.editora}
                    </li>
               ))}
          </ul>
     );
}

export default ListaLivros;
