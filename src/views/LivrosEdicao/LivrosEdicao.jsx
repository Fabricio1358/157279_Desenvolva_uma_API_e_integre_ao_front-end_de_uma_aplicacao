import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { useParams } from 'react-router-dom'
import { LivrosService } from '../../api/LivrosService.js'
import { useNavigate } from 'react-router-dom'

const LivrosEdicao = () => {
     const navegate = useNavigate()
     let { livroId } = useParams();

     const [livro, setLivro] = useState({
          id: '',
          titulo: '',
          paginas: '',
          isbn: '',
          editora: ''
     });

     async function getLivro() {
          try {
               const { data } = await LivrosService.getLivro(livroId);
               setLivro(data.book);
               console.log(data.book)
          } catch (error) {
               alert('Erro ao buscar livro');
          }
     }

     async function editLivro() {
          const body = {
               id: Number(livro.id),
               titulo: livro.titulo,
               paginas: Number(livro.paginas),
               isbn: livro.isbn,
               editora: livro.editora
          }
          if (livro.id != undefined && livro.id != '' && livro.titulo != undefined && livro.titulo != '' && livro.paginas != undefined && livro.paginas != '' && livro.isbn != undefined && livro.isbn != '' && livro.editora != undefined && livro.editora != '') {
               await LivrosService.updateLivro(Number(livro.id), body)
                    .then(({ data }) => {
                         alert(data.mensagem)
                         navegate('/livros')
                    })
                    .catch(({ response: { data, status } }) => {
                         alert(`${status} - ${data}`)
                    });
          }
     }

     useEffect(() => {
          getLivro();
     }, []);

     return (
          <>
               <Header />
               <SubmenuLivros />
               <div className='livrosCadastro'>
                    <h1>Edição de Livros</h1>
                    <div>
                         <form id="formulario">
                              <div className='form-group'>
                                   <label>Id</label>
                                   <input type="text" disabled value={livro.id || ''} />
                              </div>
                              <div className='form-group'>
                                   <label>Titulo</label>
                                   <input type="text" value={livro.titulo || ''} onChange={(e) => setLivro({ ...livro, titulo: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <label>Número de Páginas</label>
                                   <input type="text" value={livro.paginas || ''} onChange={(e) => setLivro({ ...livro, paginas: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <label>ISBN</label>
                                   <input type="text" value={livro.isbn || ''} onChange={(e) => setLivro({ ...livro, isbn: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <label>Editora</label>
                                   <input type="text" value={livro.editora || ''} onChange={(e) => setLivro({ ...livro, editora: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                   <button onClick={(e) => {
                                        e.preventDefault();
                                        editLivro();
                                   }}>Atualizar Livro</button>
                              </div>
                         </form>
                    </div>
               </div>
          </>)

}

export default LivrosEdicao