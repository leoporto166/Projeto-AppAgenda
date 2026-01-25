import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, type FormEvent } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";


export default function Login(){

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const navigate = useNavigate()

    async function login(event: FormEvent) {

        event.preventDefault()

        try{
        
        await signInWithEmailAndPassword(auth, email, senha)


        console.log("Usuario logado")
        setEmail("")
        setSenha("")
        navigate("/Projeto-AppAgenda/")



    } catch (error: any) {
    console.log(error)

    if (error.code === "auth/invalid-credential") {
    alert("Email ou senha incorretos, Se não tiver cadastro faça-o")
    }
    else {
      alert("Erro ao fazer login")
    }
  }
}
    return(

        <>
        
        <>
            <div className="flex justify-center items-center h-[200px] text-4xl font-medium">
                <h1>Que bom que voltou!</h1>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                <form onSubmit={login} className="flex flex-col items-center ">   
                    <label className="flex w-[350px] text-xl font-semibold">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-[350px] bg-green-200/50 border rounded my-4 h-[50px] p-1 text-lg"
                    ></input>
                    <label className="flex w-[350px] text-xl font-semibold">Senha</label>
                    <input
                        type="password"
                        placeholder="*******"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        minLength={6}
                        required
                        className="w-[350px] bg-green-200/50 border rounded my-4 h-[50px] p-1 text-lg"
                    ></input>
                    <button type="submit" className="bg-green-900 w-[350px] h-[50px] rounded text-white text-xl cursor-pointer">Entrar</button>
                </form>

                <div className="flex">
                    <a className="underline mt-1 font-medium cursor-pointer">Não tem uma conta? Cadastrar!</a>
                </div>
            </div>
        </>
        
        </>


    )

}