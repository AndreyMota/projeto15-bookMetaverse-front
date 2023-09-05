import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import api from "../axiosConfig";
import { BiEdit } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { GoLocation } from "react-icons/go";
import { PiBookBookmarkLight } from "react-icons/pi";
import { BsPersonVcard } from "react-icons/bs";
import EditUser from "../components/EditUser";
import Fab from '@mui/material/Fab';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import styled from "styled-components";

export default function UserPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [isClicked, setIsClicked] = useState(false)
    const [updatedUser, setUpdatedUser] = useState(false)

    // Authorization
    useEffect(() => { if (!user) { navigate("/login") } }, []);
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };

    const [nameUser, setNameUser] = useState(user?.name);
    const [foto, setFoto] = useState(user?.photo);
    const [author, setAuthor] = useState("");
    const [cities, setCities] = useState("");
    const [genders, setGenders] = useState("");

  
    useEffect(() => {
        api.get(`info-usuario`, config)
            .then((res) => {
                const { photo, userName, author, city, genders } = res.data;
                setFoto(photo);
                setNameUser(userName);
                setAuthor(author);
                setCities(city);
                setGenders(genders)
            })
            .catch(err => console.log(err))
    }, [updatedUser])

    return (
        <>
            {isClicked ?
                <EditUser
                    setIsClicked={setIsClicked}
                    setUpdatedUser={setUpdatedUser}
                    updatedUser={updatedUser}
                    foto={foto}
                    nameUser={nameUser}
                    genders={genders}
                    author={author}
                    cities={cities}
                /> :
                <Container>
                    <NavButtons>
                        <Fab title="Usuário" aria-label="usuario" variant="extended" onClick={() => navigate('/')} size="small" sx={{ boxShadow: "none" }}>
                            <ArrowCircleLeftOutlinedIcon /> Voltar
                        </Fab>
                    </NavButtons>
                    <Banner>
                        <h1>Bem-vindo(a) ao seu perfil!</h1>
                    </Banner>
                    <Profile>
                        <ProfilePicture src={foto} alt="Foto-perfil" />
                        <P>{nameUser} <GoPerson /> </P>
                        <P>{cities} <GoLocation /> </P>
                        <P>{author} <BsPersonVcard /> </P>
                        <P>{genders} <PiBookBookmarkLight /></P>
                        <Button onClick={() => setIsClicked(true)}>Editar perfil <BiEdit /></Button>
                    </Profile>
                </Container>
            }
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* padding-top: 150px; */
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

const ProfilePicture = styled.img`
    width: 150px;
    height: 150px;
    margin-top: 30px;
    margin-bottom: 50px;
    border: 2px solid #D8BFD8;
    border-radius: 50%;
    background: #ffffff;
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
        /* font-style: italic; */
        color: #BA55D3;
        text-align: center;
    }
`
const P = styled.p`
    font-size: 20px;
    font-weight: 700;
    font-family: 'Mulish', sans-serif;
    color: #BA55D3;
    margin-bottom: 10px;
`
const NavButtons = styled.div`
  position: absolute;
  width: 500px;
  top: 20px;
  left: 20px;
  button {
    color: white;
    background-color: #DDA0DD;
    &:last-of-type{

    }
  }
`;