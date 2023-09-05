import { useState } from "react";
import UserContext from "./contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/Home/HomePage";
import AddBook from "./pages/AddBook";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/usuario" element={<UserPage />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/novo-livro" element={<AddBook />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App