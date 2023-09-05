import { useState } from "react"
import styled from "styled-components"
import api from "../axiosConfig"
import { ThreeDots } from "react-loader-spinner"


export default function EditUser({ setIsClicked, setUpdatedUser, updatedUser, foto, nameUser, cities, genders, author }){
    const [form, setForm] = useState({ name: nameUser, author: author, city: cities, photo: foto, genders: genders })

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function onSubmit(e) {
        e.preventDefault();

        api.post(`editar-usuario`, form, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            setIsClicked(false)
            setUpdatedUser(!updatedUser)
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
                    <div>
                        <label htmlFor="photo">Foto</label>
                        <Inputs
                            id="photo"
                            name="photo"
                            placeholder="Foto"
                            value={form.photo}
                            onChange={handleForm}
                        />
                    <div>
                    </div>
                        <label htmlFor="name">Nome</label>
                        <Inputs
                            id="name"
                            name="name"
                            placeholder="Nome"
                            value={form.name}
                            onChange={handleForm}
                        />
                    </div>
                    <div>
                        <label htmlFor="state">Estado</label>
                        <Inputs
                            name="state"
                            id="state"
                            placeholder="Estado"
                            value={form.state}
                            onChange={handleForm}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <Inputs
                            name="city"
                            id="city"
                            placeholder="Cidade"
                            value={form.city}
                            onChange={handleForm}
                        />
                    </div>
                    <div>
                        <label htmlFor="gender">Genero</label>
                        <Inputs
                            name="gender"
                            id="gender"
                            placeholder="Genero"
                            value={form.gender}
                            onChange={handleForm}
                        />
                    </div>
                </Profile>
                <Button type="submit">Salvar Alterações</Button>
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

const Button = styled.button`
    width: 100%;
    height: 35px;
    border: 0;
    border-radius: 5px;
    background-color: #DDA0DD;
    font-family: 'Mulish', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    margin-top: 15px;
    cursor: pointer;
    transition: all 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-shrink: 0;
    &:hover{
        color: 	#BA55D3;
        background-color: #F5F5F5;
        border: 1px solid #8B008B;
    }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 470px;
    background-color: #FFE4E1;
    box-sizing: border-box;
    border: 1px solid #DDA0DD;
    border-radius: 10px;
    min-width: 350px;
    padding: 20px;
    margin-right: 20px;
`