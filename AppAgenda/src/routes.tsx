import { createBrowserRouter } from "react-router-dom"; 
import Cadastro from "./pages/cadastro" 
import Login from "./pages/login" 
import App from "./App" 

const router = createBrowserRouter([ 
  { path: "/Agenda", element: <App /> }, 
  { path: "/Agenda/Cadastro", element: <Cadastro /> },
  { path: "/Agenda/Login", element: <Login /> } 
   
])

export {router}
