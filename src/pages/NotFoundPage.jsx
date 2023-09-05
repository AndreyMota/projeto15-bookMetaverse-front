import styled from "styled-components"

export default function NotFoundPage() {
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
    font-size: 75px;
    background-color: #D8BFD8;
    color: white;
    text-align: center;
    padding-top: 50px;
`;