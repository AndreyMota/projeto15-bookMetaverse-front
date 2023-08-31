import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignInPage"
import SignUp from "./pages/SignUpPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}/>
          <Route path="/cadastro" element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
