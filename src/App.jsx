import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/Home/HomePage";
import AddBook from "./pages/AddBook";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />}/>
          <Route path="/cadastro" element={<SignUp />}/>
          <Route path="/" element={<HomePage />}/>
          <Route path="/add-book" element={<AddBook />}/>
          <Route path="/usuario" element={<UserPage />}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App