import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled  from "styled-components"
import api from "../axiosConfig";

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [confPass, setConfP] = useState('');
    const [photo, setPhoto] = useState('');
    const navigate = useNavigate();

    const handleForm = (event, qual) => {
        qual(event.target.value);
        console.log(event.target.value);
    }

    function cadastrar(event) {
        event.preventDefault();
        if (!name || !email || !password || !confPass || !photo) {
          alert('Preencha todos os campos');
          return;
        }
        if (password !== confPass) {
          alert("Senhas diferentes");
          return;
        }

        const objt = {
          name,
          email,
          password,
          photo
        }
    
        api.post(`cadastro`, objt)
          .then((res) => {
            console.log(res);
            navigate('/login')
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data);
          })
      }

    return(
        <Body>
            <SideBarr>
                <h1>Cadastre-se e venha aproveitar os nossos livros!</h1>
                <img />
            </SideBarr>
            <Container>
                <Form onSubmit={event => cadastrar(event)}>
                    <Input 
                        required 
                        type="text" 
                        placeholder="digite seu nome" 
                        name="name"
                        value={name}
                        onChange={() => handleForm(event, setName)}
                    />

                    <Input 
                        required 
                        type="email" 
                        placeholder="Digite seu e-mail" 
                        autoComplete="username" 
                        name="email"
                        value={email}
                        onChange={() => handleForm(event, setEmail)}
                    />

                    <Input 
                        required 
                        type="password" 
                        placeholder="Digite sua senha" 
                        autoComplete="new-password" 
                        name="password"
                        value={password}
                        onChange={() => handleForm(event, setPass)}
                    />

                    <Input 
                        required 
                        type="password" 
                        placeholder="Confirme sua senha" 
                        autoComplete="new-password" 
                        name="password"
                        value={confPass}
                        onChange={() => handleForm(event, setConfP)}
                    />

                    <Input 
                        required 
                        type="text" 
                        placeholder="Insira a url da imagem" 
                        name="photo"
                        value={photo}
                        onChange={() => handleForm(event, setPhoto)}
                    />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <Link to={"/login"}>
                    <p>Já possui uma conta? Faça login!</p>
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
    border: 1px solid 	#DDA0DD;
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