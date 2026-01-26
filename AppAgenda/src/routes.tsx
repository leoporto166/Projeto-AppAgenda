import { createBrowserRouter } from "react-router-dom"; 
import Cadastro from "./pages/cadastro" 
import Login from "./pages/login" 
import App from "./App" 
import CalendarDay from "./pages/CalendarDay";

const router = createBrowserRouter([ 
  { path: "/Projeto-AppAgenda", element: <App /> }, 
  { path: "/Projeto-AppAgenda/Cadastro", element: <Cadastro /> },
  { path: "/Projeto-AppAgenda/Login", element: <Login /> },
    { path: `/Projeto-AppAgenda/:day`, element: <CalendarDay /> },
   {
    path: "*",
    element: <h1>404 - Página não encontrada</h1>,
  },
   
],
)

 

export {router}
