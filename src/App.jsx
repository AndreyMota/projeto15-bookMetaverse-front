import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignInPage"
import SignUp from "./pages/SignUpPage"
import UserPage from "./pages/UserPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />}/>
          <Route path="/cadastro" element={<SignUp />}/>
          <Route path="/usuario" element={<UserPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
