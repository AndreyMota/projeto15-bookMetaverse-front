import styled from 'styled-components';
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from 'react';
import api from '../axiosConfig';

export default function HistoryPage() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState();

  const config = { headers: { Authorization: `Bearer ${user?.token}` } };
  useEffect(() => {
    api.get('history', config)
    .then((res) => {setOrders(res.data); console.log(res)})
    .catch((err) => {console.log(err)});
  }, []);

  if (!orders || orders === []) {
    return (
      <Header>
        <h1>Histórico</h1>
      </Header>
    )
  }
  return (
    <>
        <Header>
            <h1>Histórico</h1>
        </Header>
        <HistoryPageWrapper>
        {orders.map((order, orderIndex) => (
          <OrderContainer key={orderIndex}>
            {order.cart.map((item, itemIndex) => (
              <div className='compra' key={itemIndex}>
                <OrderImage src={item.img} alt="Livro" />
                <p>
                  {item.name} x {item.amount} = R${String(item.subtotal.toFixed(2)).replace('.', ',')}
                </p>
              </div>
            ))}
            <div className='infos'>
              <p className='total'>TOTAL: R${String(order.subtotal.toFixed(2)).replace('.', ',')}</p>
              <p>{order.dateTime}</p>
            </div>
          </OrderContainer>
        ))}
        </HistoryPageWrapper>
    </>
  );
}

const HistoryPageWrapper = styled.div`
  .compra {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .infos {
    .total {
      margin-top: 10px
    }
  }
  
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  flex-wrap: wrap
`;

const OrderImage = styled.img`
  max-width: 105px;
  max-height: 195px;
  margin-right: 10px;
`;

const Header = styled.header`
  padding: 15px 0;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(221, 160, 221, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  h1 {
    font-family: 'Mulish', sans-serif;
    font-size: 44px;
    text-align: center;
    color: white;
    margin: 0;
  }
`;

/* const orders = [
  {
    cart: [
      {
        bookId: '64f74847c0d25588e633f63c',
        name: 'O morro dos ventos uivantes',
        img: 'https://m.media-amazon.com/images/I/51sz0nn7u9L._SY344_BO1,204,203,200_QL70_ML2_.jpg',
        section: 'Romance',
        subtotal: 20.9,
        amount: 1,
      },
      {
        bookId: '64f747d5c0d25588e633f62e',
        name: 'O pequeno príncipe',
        img: 'https://m.media-amazon.com/images/I/41bVyDoK3uL._SY344_BO1,204,203,200_QL70_ML2_.jpg',
        section: 'Top',
        subtotal: 11.9,
        amount: 1,
      },
    ],
    dateTime: '13:29:00, 05/09/2023',
    subtotal: 32.8,
  },
  {
    cart: [
      {
        bookId: '64f747d5c0d25588e633f62e',
        name: 'O pequeno príncipe',
        img: 'https://m.media-amazon.com/images/I/41bVyDoK3uL._SY344_BO1,204,203,200_QL70_ML2_.jpg',
        section: 'Top',
        subtotal: 11.9,
        amount: 1,
      },
    ],
    dateTime: '13:28:14, 05/09/2023',
    subtotal: 11.9,
  },
  {
    cart: [
      {
        bookId: '64f745dac0d25588e633f627',
        name: 'O pequeno Príncipe',
        img: 'https://m.media-amazon.com/images/I/41bVyDoK3uL._SY344_BO1,204,203,200_QL70_ML2_.jpg',
        section: 'Top',
        subtotal: 35.7,
        amount: 3,
      },
    ],
    dateTime: '12:28:10, 05/09/2023',
    subtotal: 35.7,
  },
  // Adicione mais objetos de pedido conforme necessário
]; */
