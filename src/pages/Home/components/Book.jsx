import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import api from "../../../axiosConfig";
import styled from "styled-components";

export default function Book({ bookId, name, img, price, toBuy, setRefreshCart, setOpenCart }) {
  const { user } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  function handleBuyClick() {
    const body = { bookId, add: true };
    api.put('cart', body, config)
      .then(res => {
        setRefreshCart(x => !x);
        setOpenCart(true);
      })
      .catch(err => alert(err.response.request.responseText));
  }

  return (
    <Livro>
      <div className="book">
        <img src={img} alt={name} />
        <p>{name}</p>
        <div className="bottom">
          <span>R$ {price.toFixed(2).replace('.', ',')}</span>
            <button disabled={!toBuy} onClick={() => handleBuyClick()}>Comprar</button>
        </div>
      </div>
    </Livro>
  )
}

const Livro = styled.div`
  .book {
    max-width: 210px; /* 105 */
    max-height: 390px; /* 150  */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

    img {
      max-width: 100%;
      height: 300px;
      max-width: 200px; /* Largura máxima da imagem */
      max-height: 300px; /* Altura máxima da imagem */
    }

    p {
      font-size: 16px;
      margin: 10px 0;
    }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      span {
        font-size: 18px;
        color: #007bff; /* Azul para o preço */
      }

      button {
        background-color: #ff85a2; /* Rosa pastel para o botão */
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;

        /* Efeito de hover */
        &:hover {
          background-color: #ff6b8e; /* Cor mais escura no hover */
        }
      }
    }
  }
`;
