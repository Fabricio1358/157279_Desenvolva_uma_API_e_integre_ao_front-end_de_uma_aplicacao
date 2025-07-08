import { useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import { useNavigate } from 'react-router-dom'

const LivrosCadastro = () => {
     const navegate = useNavigate()
     const [livro, setLivro] = useState({
          id: '',
          titulo: '',
          paginas: '',
          isbn: '',
          editora: ''
     });

     async function createLivro() {
          const body = {
               id: Number(livro.id),
               titulo: livro.titulo,
               paginas: Number(livro.paginas),
               isbn: livro.isbn,
               editora: livro.editora
          };

          if (
               livro.id && livro.titulo && livro.paginas &&
               livro.isbn && livro.editora
          ) {
               try {
                    const response = await LivrosService.createLivro(body);
                    console.log('Livro criado:', response.data);
                    document.getElementById('formulario').reset();
                    navegate('/livros')
               } catch ({ response: { data, status } }) {
                    alert(`${status} - ${data}`);
               }
          } else {
               alert('Preencha todos os campos!');
          }
     }

     return (
          <>
               <Header />
               <SubmenuLivros />
               <div className='livrosCadastro'>
                    <h1>Cadastro de Livros</h1>
                    <div>
                         <form id="formulario">
                              <div className='form-group'>
                                   <label>Id</label>
                                   <input type="text" required onChange={(e) => setLivro({ ...livro, id: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <label>Titulo</label>
                                   <input type="text" required onChange={(e) => setLivro({ ...livro, titulo: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <label>Número de Páginas</label>
                                   <input type="text" required onChange={(e) => setLivro({ ...livro, paginas: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <label>ISBN</label>
                                   <input type="text" required onChange={(e) => setLivro({ ...livro, isbn: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <label>Editora</label>
                                   <input type="text" required onChange={(e) => setLivro({ ...livro, editora: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <button onClick={(e) => {
                                        e.preventDefault();
                                        createLivro();
                                   }}>Cadastrar Livro</button>
                              </div>
                         </form>
                    </div>
               </div>
          </>
     );
};

export default LivrosCadastro;
