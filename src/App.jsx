import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignInPage"
import SignUp from "./pages/SignUpPage"
import HomePage from "./pages/Home/HomePage"
import AddBook from "./pages/AddBook"
import UserPage from "./pages/UserPage"
import UserContext from "./contexts/UserContext"
import { useState } from "react"

function App() {
  const [user,setUser] = useState();

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignIn />}/>
            <Route path="/cadastro" element={<SignUp />}/>
            <Route path="/" element={<HomePage />}/>
            <Route path="/add-book" element={<AddBook />}/>
            <Route path="/usuario" element={<UserPage />}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
