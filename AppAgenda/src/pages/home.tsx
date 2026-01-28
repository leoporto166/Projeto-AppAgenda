import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { query } from "firebase/firestore/lite"
import { doc } from "firebase/firestore";
import { db, auth } from "../services/firebase"
import Calendar from "../components/calendar"
import { collection, deleteDoc, onSnapshot, orderBy } from "firebase/firestore"


export default function Home(){

    const navigate = useNavigate()    
    const[tamanhoTela, setTamanhoTela] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const[informacoes, setInformacoes] = useState<any[]>([])


    const data =  new Date().toISOString().split("T")[0]

    useEffect(() => {

        
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            if(!user) return
        
        const data = new Date().toISOString().split("T")[0] 
        const ref = collection(
                db, 
                "Usuario",
                user.uid,
                "eventos",
                data,
                "lista"
        )

        const q = query(ref, orderBy("createdAt", "asc"))

        const unsubData = onSnapshot(q, (snap) => {
            const dados = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()

            }))

            setInformacoes(dados)
        })

        return () => unsubData()
    
    })

    return () => unsubAuth()

    }, [])
        
        







    useEffect(() => {

        const unsubAuth = onAuthStateChanged(auth, (user) => {
            if(!user){
                navigate("/Projeto-AppAgenda/Cadastro")
                return
            }


        return () => unsubAuth()

        })


        function Renderizar() {

            setTamanhoTela({
                width: window.innerWidth,
                height: window.innerHeight
            })

        }

        window.addEventListener("resize", Renderizar )


        return () => {
            window.removeEventListener("resize", Renderizar)
        }


    }, [tamanhoTela])


    async function Excluir(idEvent: string) {

        const user = auth.currentUser
        const data = new Date().toISOString().split("T")[0] 

        if(!user) return

        const ref = doc(db, 
                "Usuario",
                user.uid,
                "eventos",
                data,
                "lista",
                idEvent
            )

        deleteDoc(ref)



        
    }


    return(
        <main className="">
            <Header></Header>
            
            {
                tamanhoTela.width <= 650 && (
                    <div className="flex flex-col items-center p-4">
                    
                    <Calendar />

                    { informacoes.length > 0 ? (
                        <h1 className="text-xl font-bold my-4">ANOTAÇÕES DE HOJE: {data}</h1>

                        ) : (

                            <>
                                <h2 className="text-xl font-bold my-4">Você Não tem anotações no dia de hoje! :(</h2>
                            </>

                        )

                    }


                    <div className="flex flex-col w-full">
                        { 
                            informacoes.map((info) => (
                                <>
                                <div className="flex gap-2">
                                    <h2 className="font-medium text-lg">{info.titulo}</h2>
                                    <button className="bg-red-600 text-white p-1 rounded" onClick={() => {Excluir
                                        (info.id)
                                    }}>Excluir</button>
                                </div>
                                <p>{info.descricao}</p> <br />
                                </>
                            ))
                        }

                    </div>

                    
                    </div>
    
    
                )
            }

        </main>

    )

}
