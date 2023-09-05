import styled from "styled-components";
import api from "../../../axiosConfig";

export default function Book({ kay, nome, imge, preco, vale }) {
  function handleBuyClick(event) {
    event.preventDefault();
    alert(preco);
    alert(typeof(preco));
    const objt = {
      id: kay,
      name: nome,
      url: imge,
      amount: 1,
      subtotal: Number(preco.replace(',', '.'))
    }
    api.post('add-cart', objt, {headers: {
      Authorization: "Bearer 181091f5-973c-4431-abaa-b9023698336c" /* token local */
    }})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }

  return (
    <Livro>
      <div className="book">
        <img src={imge} alt={nome} />
        <p>{nome}</p>
        <div className="bottom">
          <span>R${preco}</span>
          {vale? 
          <button onClick={handleBuyClick}>Comprar</button> : 
          <button>Comprar</button> }
        </div>
      </div>
    </Livro>
  )
}

const Livro = styled.div`
  .book {
    max-width: 210px;
    max-height: 390px;
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
