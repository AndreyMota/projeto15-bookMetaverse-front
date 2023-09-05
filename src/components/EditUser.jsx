import { useState } from "react"
import styled from "styled-components"
import api from "../axiosConfig"
import { ThreeDots } from "react-loader-spinner"
import UserContext from "../contexts/UserContext"
import { useContext } from "react"


export default function EditUser({ setIsClicked, setUpdatedUser, updatedUser, foto, nameUser, cities, genders, author }){
    const [form, setForm] = useState({ name: nameUser, author: author, city: cities, photo: foto, genders: genders })
    const { user } = useContext(UserContext);
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function onSubmit(e) {
        e.preventDefault();

        api.put(`editar-usuario`, form, config)
        .then(res => {
            setIsClicked(false)
            setUpdatedUser(!updatedUser)
            console.log(updatedUser)
        })
        .catch(err =>
            alert(err.response.message),
        )
    }


    return (
        <Container>
            <Banner>
                <h1>Edite seu perfil para ficar a sua cara!</h1>
            </Banner>
            <Form onSubmit={onSubmit}>
                <Profile>        
                    <Inputs
                        required
                        id="photo"
                        name="photo"
                        placeholder="Foto"
                        value={form.photo}
                        onChange={handleForm}
                    />                                               
                    <Inputs
                        required
                        id="name"
                        name="name"
                        placeholder="Nome"
                        value={form.name}
                        onChange={handleForm}
                    />       
                    <Inputs
                        required
                        name="city"
                        id="city"
                        placeholder="Cidade"
                        value={form.cities}
                        onChange={handleForm}
                    />           
                    <Inputs
                        required
                        name="author"
                        id="author"
                        placeholder="Autores prediletos"
                        value={form.author}
                        onChange={handleForm}
                    />
                    <Inputs
                        required
                        name="genders"
                        id="genders"
                        placeholder="Generos preferidos"
                        value={form.genders}
                        onChange={handleForm}
                    />
                    <Button type="submit">Salvar Alterações</Button>
                </Profile>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-top: 150px;
    box-sizing: border-box;
    background-color: #D8BFD8;
    height: 100%;
`

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 450px;
    background-color: #FFF0F5;
    margin-right: 20px;
    box-sizing: border-box;
    border: 1px solid #8B008B;
    border-radius: 10px;
    padding: 20px;
    min-width: 280px;
`

const Banner = styled.div`
    width: 1000px;
    margin-left: 20px;
    box-sizing: border-box;

    & h1{
        font-family: 'Mulish', sans-serif;
        font-size: 34px;
        font-weight: 700;
        margin-bottom: 10px;
        font-style: italic;
        color: #BA55D3;
        text-align: center;
    }
`

const Form = styled.form`
    width: 300px;
    box-sizing: border-box;
`
const Inputs = styled.input`
    width: 250px;
    height: 40px;
    margin-bottom: 7px;
    box-sizing: border-box;
    border: 1px solid #DDA0DD;
    border-radius: 5px;
    padding-left: 10px;
    font-family: 'Mulish', sans-serif;
`
const Button = styled.button`
    width: 250px;
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