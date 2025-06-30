import Header from "../../components/Header/Header";
import ListaLivros from "../../components/ListaLivros/listaLivros.jsx";
import "./index.scss";

export default function Home() {
     return (
          <div className='home'>
               <Header />
               <h1>Biblioteca Central Online - Livros</h1>
               <ListaLivros />
          </div>
     )
}