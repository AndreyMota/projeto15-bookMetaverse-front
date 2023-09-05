import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import api from "../axiosConfig.js";
import Book from "./Home/components/book";
import styled from "styled-components";

export default function AddBook() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [nome, setNome] = useState('');
    const [imge, setImge] = useState('');
    const [preco, setPreco] = useState('');
    const [secao, setSecao] = useState('');

    // Authorization
    useEffect(() => { if (!user) { navigate("/login") } }, []);
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };

    const handleForm = (event, qual) => {
        qual(event.target.value);
    }

    const previa = (event) => {
        event.preventDefault();
        if (!nome || !imge || !preco) {
            alert('preencha todos os campos');
        }
        const objt = {
            name: nome,
            img: imge,
            price: preco,
            section: secao
        }

        api.post('books', objt)
            .then((res) => {
                console.log(res);
                alert(res.data.message);
            })
            .catch((err) => console.log(err));
    }

    return (
        <AdicionaLivro>
            <div className="left">
                <form onSubmit={previa} className="formulario">
                    <label>Nome da obra</label>
                    <input onChange={(event) => handleForm(event, setNome)} value={nome} type="text"></input>
                    <label>Imagem de capa</label>
                    <input onChange={(event) => handleForm(event, setImge)} value={imge} type="text"></input>
                    <label>Preço do produto (xx,xx)(str)</label>
                    <input onChange={(event) => handleForm(event, setPreco)} value={preco} type="text"></input>
                    <label>Section (top = mais vendidos/ rom = romance/ twd = quadrinhos)</label>
                    <input onChange={(event) => handleForm(event, setSecao)} value={secao} type="text"></input>
                    <button>Enviar</button>
                </form>
            </div>

            <div className="right">
                <Book nome={nome} imge={imge} preco={preco} vale={false} />
            </div>
        </AdicionaLivro>
    )
}

const AdicionaLivro = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 768px) {
        flex-direction: row;
    }

    .left {
        width: 100%;
        max-width: 400px;

        @media (min-width: 768px) {
            width: 50%;
            max-width: none;
            padding-right: 20px;
        }

        .formulario {
            display: flex;
            flex-direction: column;
            gap: 10px;

            label {
                font-size: 18px;
                color: #333;
            }

            input {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 16px;
                background-color: #f4f4f4;
            }

            button {
                background-color: #f4f4f4;
                color: #333;
                font-size: 18px;
                padding: 10px 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }

    .right {
        width: 100%;
        max-width: 400px;
        text-align: center;

        @media (min-width: 768px) {
            width: 50%;
            max-width: none;
            padding-left: 20px;
        }
    }
`;
