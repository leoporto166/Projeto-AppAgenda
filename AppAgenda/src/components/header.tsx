import { useEffect, useState } from "react"
import "./header.css"
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore/lite"
import { db } from "../services/firebase"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth/cordova"
import { FaUserCircle } from "react-icons/fa"



export default function Header(){

    const navigate = useNavigate()    
    const[menuActive, setMenuActive] = useState
    (false)
    const[nome, setNome] = useState("")
    const[tamanhoTela, setTamanhoTela] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    


    async function buscarNome() {


        
        const auth = getAuth()     
        
        const unsub = onAuthStateChanged(auth, async (user) => {
        if(!user){
        navigate("/Projeto-AppAgenda/Cadastro")
        return
          
        }
        
        const ref = doc(db, "User", user.uid)
        const snap = await getDoc(ref)

        if(snap.exists()){
            setNome(snap.data().nome)
        }
    
    })

    return () => unsub()

        

    }


    useEffect(() => {

        buscarNome()

        function Renderizar() {

            setTamanhoTela({
                width: window.innerWidth,
                height: window.innerHeight
            })

        }

        window.addEventListener("resize", Renderizar )


        return () => {
            window.removeEventListener("resize", Renderizar)
    };

    }, [tamanhoTela])

    return(

        <main className={`m-0 ${menuActive
        ? "bg-gray-200" : "bg-white"}`}>
            
            {tamanhoTela.width <= 650 && (

                 <div>
                     <header className="h-[50px] relative">
                        <section className="flex justify-between px-2 items-center h-[45px]">
                            {menuActive ? (
                                <>
                                <div
                                    onClick={() => {setMenuActive(false)}}
                                    className="z-30 absolute mt-2"
                                >
                                    <div className="bg-black h-[2px] w-[30px] x1"></div>
                                    <div className="bg-black h-[2px] w-[30px] my-1 x2"></div>
                                </div>
                     
                     
                                </>
                            ) : (
                                <></>
                            )}
                            <div className="mt-2"
                                    onClick={() => {setMenuActive(true)}}
                                    >
                                        <div className={`bg-black w-[25px] h-[2px]`}></div>
                                        <div className="bg-black w-[25px] h-[2px] my-1 "></div>
                                        <div className="bg-black w-[25px] h-[2px] my-1 "></div>
                            </div>
                            <div className="m-2 mt-3 flex w-full items-center">
                                <h1 className={` font-bold z-10 ${menuActive
                                    ? "" : ""}`}>Plann</h1>
                            </div>
                            <div className="flex items-center font-medium">
                                <FaUserCircle size={20}></FaUserCircle>
                                {nome}
                     
                            </div>
                        </section>
                        
                                     </header>
                                     
                                     <div
                        className={`
                            fixed top-0 left-0 h-screen w-6/12 bg-white z-20
                            transform transition-transform duration-300 ease-in-out
                            ${menuActive ? "translate-x-0" : "-translate-x-full"}
                        `}
                        >
                                     </div>
                     
                                     <div className={`bg-green-700
                        w-full h-[1px] ${menuActive ? "" : "" }`}></div>
                 </div>

            )}
                
        </main>

    )
}