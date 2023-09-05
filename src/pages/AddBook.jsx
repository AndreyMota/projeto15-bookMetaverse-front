import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import api from "../axiosConfig.js";
import Book from "./Home/components/Book";
import styled from "styled-components";

export default function AddBook() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [formFields, setFormFields] = useState({ name: '', img: '', price: '', section: '' });

    // Authorization
    useEffect(() => { if (!user) { navigate("/login") } }, []);
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };

    function handleAddBook(event) {
        event.preventDefault();
        if (!formFields.name || !formFields.img || !formFields.price || !formFields.section) {
            alert('Todos os campos são obrigatórios!');
        }

        const body = {...formFields, price: Number(formFields.price)};
        api.post('books', body, config)
            .then((res) => {
                alert("Livro adicionado à venda!");
            })
            .catch(err => alert(err.response.request.responseText));
    }

    return (
        <AdicionaLivro>
            <div className="left">
                <form onSubmit={e => handleAddBook(e)} className="formulario">
                    <label>Nome da obra</label>
                    <input
                        type="text"
                        onChange={(e) => setFormFields({...formFields, name: e.target.value})}
                        value={formFields.name} />
                    <label>Imagem de capa (url)</label>
                    <input
                        type="url"
                        onChange={(e) => setFormFields({...formFields, img: e.target.value})}
                        value={formFields.img}
                    />
                    <label>Preço do produto (float)</label>
                    <input
                        type="number"
                        onChange={(e) => setFormFields({...formFields, price: e.target.value})}
                        value={formFields.price}
                    />
                    <label>Section (Top / Romance / HQ / Didático / Autoajuda)</label>
                    <input
                        type="text"
                        onChange={(e) => setFormFields({...formFields, section: e.target.value})}
                        value={formFields.section}
                    />
                    <button type="submit">Enviar</button>
                </form>
            </div>

            <div className="right">
                <Book name={formFields.name} img={formFields.img} price={Number(formFields.price)} toBuy={false} />
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
