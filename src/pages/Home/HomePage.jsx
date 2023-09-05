import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import api from "../../axiosConfig.js";
import BookList from "./components/bookList";
import Cart from "./Cart";
import styled from "styled-components";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [openCart, setOpenCart] = useState(false);
  const [books, setBooks] = useState([]);
  const [top, setTop] = useState(false);
  const [twd, setTwd] = useState(false);
  const [rom, setRom] = useState(false);

  // Authorization
  useEffect(() => { if (!user) { navigate("/login") } }, []);
  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  // Get Books
  useEffect(() => {
    api.get('/books')
      .then((res) => {
        // console.log(res);
        setBooks(res.data);
        res.data.forEach((x) => {
          if (x.section === 'twd') setTwd(true);
          if (x.section === 'top') setTop(true);
          if (x.section === 'rom') setRom(true);

        })
      })
      .catch((err) => console.log(err));
  }, []);

  if (!books) {
    return (
      <h1>Loading</h1>
    )
  }

  function handleLogOut() {
    api.delete(`/logout`, config)
      .then(res => {
        setUser(null);
        delete localStorage.user;
        navigate('/login');
        alert("LogOut Realizado!");
      })
      .catch(err => alert(err.response.request.responseText));
  }

  return (
    <>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <Home>
        <header>
          <h1>BookMetaverse</h1>
          <NavButtons>
            <button onClick={() => setOpenCart(true)}>Carrinho</button>
            <button onClick={handleLogOut}>LogOut</button>
          </NavButtons>
        </header>

        {
          top ?
            <>
              <h2>Mais vendidos</h2>
              <BookList books={books} section={'top'} />
            </> : null
        }
        {/* A ideia é passar por props uma tag que vai ter em alguns livros, e seccionar as booklists */}

        {
          rom ?
            <>
              <h2>Romance</h2>
              <BookList books={books} section={'rom'} />
            </> : null
        }

        {
          twd ?
            <>
              <h2>Quadrinhos</h2>
              <BookList books={books} section={'twd'} />
            </> : null
        }
      </Home>
    </>

  )
}

const Home = styled.div`
  margin-top: 90px; /* Espaço para acomodar o cabeçalho fixo */
  header {
    position: relative;
    margin-bottom: 15px;
    padding: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 40px;
    }
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; /* Fazer o cabeçalho ocupar a largura total da tela */
    background-color: #fff; /* Adicionar plano de fundo branco */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Adicionar sombra para destacar */
    z-index: 5; /* Certifique-se de que o cabeçalho esteja acima do conteúdo */
  }
  h2 {
    font-size: 1.7em;
  }
  .blist {
    margin-bottom: 200px;
    /* Adicione margem superior para afastar o conteúdo do cabeçalho */
    margin-top: 80px;
  }
`;

const NavButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 200px;
  top: 20px;
  right: 20px;
  button {
    cursor: pointer;
    font-size: 20px;
    color: white;
    display: block;
    margin: 0 auto;
    padding: 5px 10px;
    background-color: #DDA0DD;
    border: none;
    border-radius: 100px;

    &:last-of-type{
      color: #DDA0DD;
      background-color: white;
    }
  }
`;