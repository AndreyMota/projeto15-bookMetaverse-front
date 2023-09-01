import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignInPage"
import SignUp from "./pages/SignUpPage"
import HomePage from "./pages/Home/HomePage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}/>
          <Route path="/cadastro" element={<SignUp />}/>
          <Route path="/home" element={<HomePage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
