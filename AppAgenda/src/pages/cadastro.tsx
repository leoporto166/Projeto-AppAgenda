
import { auth, db } from "../services/firebase"
import {doc, setDoc } from "firebase/firestore/lite"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Cadastro(){

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const navigate = useNavigate()

    async function cadastrar(event: FormEvent){
        event.preventDefault()

        try{

        const userCredential = await createUserWithEmailAndPassword(auth, email, senha)

        const user = userCredential.user

        await setDoc(doc(db, "User", user.uid), {
            nome: nome,
            email: user.email,
            createdAt: new Date()
         })

        .then(() => {
            console.log("Usuario cadastrado")
            setNome("")
            setEmail("")
            setSenha("")
            navigate("/Agenda")
        })

    } catch(error: any) {
            console.log(`ERROR: ${error}`)
            if(error.code === "auth/email-already-in-use"){
                alert("Email ja cadastrado, faça login")
            }
        }

    }


    
    return(
        <>
            <div className="flex justify-center items-center h-[200px] text-4xl font-medium">
                <h1>Bem-Vindo</h1>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                <form onSubmit={cadastrar} className="flex flex-col items-center ">
                    <div className="flex w-[350px] text-xl font-semibold"><label>Nome</label></div>
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        minLength={4}
                        className="w-[350px] bg-green-200/50 border rounded my-2 h-[50px] p-1 text-lg"
                    >
                
                    </input>
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
                    <button type="submit" className="bg-green-900 w-[350px] h-[50px] rounded text-white text-xl cursor-pointer">Cadastrar</button>
                </form>

                <div className="flex">
                    <Link className="underline mt-1 font-medium cursor-pointer"
                    to={"/Agenda/Login"}>Ja tem uma conta? ENTRAR!</Link>
                </div>
            </div>
        </>
    )
}
