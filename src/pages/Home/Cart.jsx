import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import api from "../../axiosConfig";
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";

export default function Cart({ openCart, setOpenCart, cartItems, setRefreshCart }) {
    const { user } = useContext(UserContext);
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };

    function putCart(bookId, add) {
        const body = { bookId, add };
        api.put('cart', body, config)
        .then((res) => {
            setRefreshCart(x => !x);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
    }

    function postOrder(){
        // if (cartItems.length===0) { return }
        const body = { };
        api.post('orders', body, config)
        .then((res) => {
            alert("Pedido enviado!");
            setOpenCart(false);
            setRefreshCart(x => !x);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
    }

    return (
        <>
            {
                openCart ?
                    <CartScreen>
                        < PageBlur onClick={() => setOpenCart(false)} />
                        <CartSideBar>
                            <CartHead>
                                <h4>Carrinho de Compras ({cartItems.length})</h4>
                                <Fab aria-label="close"
                                    onClick={() => setOpenCart(false)}
                                    size="small"
                                    sx={{ backgroundColor: "white", boxShadow: "none" }}>
                                    <CloseIcon />
                                </Fab>
                            </CartHead>
                            <CartList>
                                {cartItems.map((x, i) =>
                                    <CartItem key={i}>
                                        <BookInfo>
                                            <img src={x.img} />
                                            <span>{x.name}</span>
                                        </BookInfo>
                                        <BuyInfo>
                                            <AmountGroup>
                                                <Fab aria-label="remove"
                                                    onClick={() => putCart(x.bookId, false)}
                                                    size="small"
                                                    sx={{ backgroundColor: "white", boxShadow: "none" }}>
                                                    <RemoveIcon />
                                                </Fab>
                                                {x.amount}
                                                <Fab aria-label="add"
                                                    onClick={() => putCart(x.bookId, true)}
                                                    size="small"
                                                    sx={{ backgroundColor: "white", boxShadow: "none" }}>
                                                    <AddIcon />
                                                </Fab>
                                            </AmountGroup>
                                            <span>R$ {x.subtotal.toFixed(2).replace('.', ',')}</span>
                                        </BuyInfo>
                                    </CartItem>
                                )}
                            </CartList>
                            <CartInfos>
                                <div>Subtotal:</div> 
                                <div>R$ <span>{(cartItems.length>0? cartItems.map(x => x.subtotal).reduce((a, b) => a + b) : 0).toFixed(2).replace('.', ',')}</span></div>
                            </CartInfos>

                            <FinishButton disabled={cartItems.length===0} onClick={() => postOrder()}>Finalizar Compra</FinishButton>
                        </CartSideBar>
                    </CartScreen >
                    : <></>
            }
        </>
    )
}

const CartScreen = styled.div`
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    top: 0px;
    display: flex;
    font-family: 'Mulish', sans-serif;
    font-size: 18px;
`;

const PageBlur = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
`;

const CartSideBar = styled.div`
    background-color: white;
    width: 750px;
    height: 100vh;
`;

const CartHead = styled.div`
    padding: 20px 15px 10px;
    display: flex;
    justify-content: space-between;
    h4 {   
        padding-left: 40px;
        font-size: 30px;
        font-weight: 600;
        text-align: center;
    }
    /* border-bottom: 1px solid gray; */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CartList = styled.ul`
    margin: 40px auto;
    width: 95%;
    background-color: white;
    overflow-y: scroll;
    max-height: calc(100% - 300px);
`;

const CartItem = styled.li`
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
`;

const BookInfo = styled.div`
    display: flex;
    width: 300px;
    img {
        display: block;
        padding-right: 20px;
        width: 80px;
    }
    span {
        display: inline-block;
        width: 200px;
        height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const BuyInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 125px;

    span{
        font-size: 20px;
    }
`;

const AmountGroup = styled.div`
    width: 110px;
    background-color: #FFF0F5;
    margin: 5px 0 20px;
    padding: 5px;
    border-radius: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CartInfos = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px auto;
    width: 80%;
    color: #DDA0DD;
    border-radius: 10px;
    font-size: 22px;
    font-weight: 600;
`;

const FinishButton = styled.button`
    cursor: pointer;
    font-size: 22px;
    font-weight: 600;
    color: white;
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    background-color: #DDA0DD;
    border: none;
    border-radius: 100px;
`;