import { useState, useEffect } from "react";
import { useContext } from "react";
import api from "../axiosConfig";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignIn() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    useEffect(() => { if (user) { navigate("/") } }, []);

    const [form, setForm] = useState({ email: "", password: "" });
    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function submitForm(e) {
        e.preventDefault();

        api.post(`login`, form)
            .then(res => {
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                alert("Login Realizado!");
                navigate('/');
            })
            .catch(err => alert(err.response.request.responseText));
    }

    return (
        <Body>
            <SideBarr>
                <h1>Faça login e aproveite as nossas ofertas!</h1>
                <img />
            </SideBarr>
            <Container>
                <Form onSubmit={e => submitForm(e)}>
                    <Input
                        required
                        type="email"
                        placeholder="Digite seu e-mail"
                        autoComplete="username"
                        name="email"
                        onChange={e => handleForm(e)}
                        value={form.email}
                    />
                    <Input
                        required
                        type="password"
                        placeholder="Digite sua senha"
                        autoComplete="new-password"
                        name="password"
                        onChange={e => handleForm(e)}
                        value={form.password}
                    />
                    <Button type="submit">Entrar</Button>
                </Form>
                <Link to={"/cadastro"}>
                    <p>Não possui uma conta? Cadastre-se já!</p>
                </Link>
            </Container>
        </Body>
    )
}

const Body = styled.div`
    width: 100%;
    height: 100%;
    background-color: #D8BFD8;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    width: 400px;
    height: 500px;
    background-color: #FFF0F5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 15px;

    & p{
        color: 	#8B008B;
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 12px;
        text-decoration: underline;
        margin-top: 15px;
    }
`

const Form = styled.form`
    width: 300px;
    box-sizing: border-box;
`
const Input = styled.input`
    width: 100%;
    height: 40px;
    margin-bottom: 7px;
    box-sizing: border-box;
    border: 1px solid #DDA0DD;
    border-radius: 5px;
    padding-left: 10px;
    font-family: 'Mulish', sans-serif;
`
const Button = styled.button`
    width: 100%;
    height: 35px;
    border: 1px solid #DDA0DD;
    border-radius: 5px;
    background-color: #DDA0DD;
    font-family: 'Mulish', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    margin-top: 5px;
`

const SideBarr = styled.div`
    width: 400px;
    height: 200px;
    margin-right: 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    & h1{
        font-family: 'Mulish', sans-serif;
        font-size: 50px;
        /* font-weight: ; */
        color: #FFFFFF;
        margin-bottom: 15px;
    }

    & img{
        width: 250px;
        margin-top: 10px; 
    }
`