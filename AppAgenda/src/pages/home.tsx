import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore/lite"
import { db } from "../services/firebase"
import Calendar from "../components/calendar"


export default function Home(){

    const navigate = useNavigate()    
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
        <main className="bg-green-400">
            <Header></Header>
            
            {
                tamanhoTela.width <= 650 && (
                    <>
                    
                    <Calendar />
                    
                    </>
    
    
                )
            }

        </main>

    )

}
