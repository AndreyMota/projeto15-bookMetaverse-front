import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import api from "../../axiosConfig.js";
import BookList from "./components/bookList";
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
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
            <Fab title="Carrinho" aria-label="carrinho" variant="extended" onClick={() => setOpenCart(true)} size="small" sx={{ boxShadow: "none" }}>
              <ShoppingCartIcon /> Carrinho
            </Fab>
            <Fab title="Compras" aria-label="compras" variant="extended" onClick={() => navigate('/historico')} size="small" sx={{ boxShadow: "none" }}>
              <ListIcon /> Compras
            </Fab>
            <Fab title="Usuário" aria-label="usuario" variant="extended" onClick={() => navigate('/usuario')} size="small" sx={{ boxShadow: "none" }}>
              <PersonIcon /> Usuário
            </Fab>
            <Fab title="Logout" aria-label="logout" variant="extended" onClick={handleLogOut} size="small" sx={{ boxShadow: "none" }}>
              <LogoutIcon /> Logout
            </Fab>
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

const NavButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 500px;
  top: 20px;
  right: 20px;
  button {
    color: white;
    background-color: #DDA0DD;
    &:last-of-type{

    }
  }
`;

const Home = styled.div`
  background-color: #FFF0F5;
  font-family: 'Mulish', sans-serif;
  font-size: 18px;
  /* margin: 70px 0; Espaço para acomodar o cabeçalho fixo */
  padding: 100px 0 30px;

  header {
    padding: 15px 0;
    position: fixed;
    z-index: 5; /* Certifique-se de que o cabeçalho esteja acima do conteúdo */
    top: 0;
    left: 0;
    width: 100%; /* Fazer o cabeçalho ocupar a largura total da tela */
    background-color: rgba(221, 160, 221, 0.5); /* Adicionar plano de fundo branco */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Adicionar sombra para destacar */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); 

    h1 {
      font-family: 'Mulish', sans-serif;
      font-size: 44px;
      text-align: center;
      color:white;
    }
  }

  h2 {
    padding: 0px 20px;
    font-size: 1.7em;
  }

  .blist {
    margin-bottom: 200px;
    /* Adicione margem superior para afastar o conteúdo do cabeçalho */
    margin-top: 80px;
  }
`;