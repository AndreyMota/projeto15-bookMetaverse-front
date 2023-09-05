import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function NotFoundPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Authorization
    useEffect(() => { if (!user) { navigate("/login") } }, []);

    return (
        <Container>
            <Title>404 Page not found</Title>
        </Container>
    )
}

const Container = styled.body`
    background-color: #D8BFD8;
`;

const Title = styled.h1`
    font-family: 'Mulish', sans-serif;
    font-size: 50px;
    background-color: #D8BFD8;
    color: white;
    text-align: center;
    padding-top: 50px;
`;