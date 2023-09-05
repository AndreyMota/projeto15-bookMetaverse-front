import Book from "./book"
import { useRef } from "react"



export default function BookList({ books, section}) {
    const scrollContainerRef = useRef(null);


    const handleScroll = (scrollAmount) => {
        if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += scrollAmount;
        }
    };
    if (!books) {
        return <Book />
    }
    return (
        <BookListContainer>
            <div className="book-list" ref={scrollContainerRef}>
            {
            section
                ? books.map((x) => {
                    if (x.section === section) {
                    return <Book key={x._id} kay={x._id} imge={x.img} nome={x.name} preco={x.price} vale={true} />;
                    }
                    return null; // Você pode retornar null para ignorar elementos indesejados
                })
                : books.map((x) => (
                    <Book key={x._id} kay={x._id} imge={x.img} nome={x.name} preco={x.price} vale={true} />
                ))
            }
            </div>
            
            
            <div className="buttons-f">
                <ScrollButton onClick={() => handleScroll(-300)} className="sb">Anterior</ScrollButton>
                <ScrollButton onClick={() => handleScroll(300)} className="sb">Próximo</ScrollButton>
            </div>
            
        </BookListContainer>
    )
}

/*  */

import styled from "styled-components";

const BookListContainer = styled.div`
    .book-list{
        display: flex;
        overflow-x: scroll;
        gap: 20px;
        padding: 20px;
        background-color: #f2f2f2;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 100%;
        scrollbar-width: thin;
        scrollbar-color: #ccc transparent;
        scroll-behavior: smooth;
        
        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #ccc;
        }
    }
    .buttons-f {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .sb {
            margin-left: 20px;
            margin-right: 20px;
        }
    }
    margin-bottom: 50px;
`;

const ScrollButton = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4040;
  }
`;
