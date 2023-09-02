import styled from "styled-components";
import BookList from "./components/bookList";

export default function HomePage() {
    return (
        <Home>
            <header>
                <h1>BookMetaverse</h1>
            </header>

            <h2>Mais vendidos</h2>
            <BookList /> {/* A ideia é passar por props uma tag que vai ter em alguns livros, e seccionar as booklists */}
            <h2>Para refletir</h2>
            <BookList />
        </Home>
    )
}

const Home = styled.div`
header {
    margin-bottom: 15px;
    padding-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
        font-family: 'Playfair Display', serif;
        font-size: 40px;
    }
}
h2 {
    font-size: 1.7em;
}
.blist {
    margin-bottom: 200px;
}
`