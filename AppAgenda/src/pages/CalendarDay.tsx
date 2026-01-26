
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import { getAuth, onAuthStateChanged } from "firebase/auth/cordova";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "../services/firebase";
import { useEffect, useState } from "react";

export default function CalendarDay(){

    const {day} = useParams<{ day: string }>()
    const navigate = useNavigate()
    const[name, setNome] = useState("")
    const[tamanhoTela, setTamanhoTela] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const[informacoes, setInformacoes] = useState<any>(null)

    


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


    async function buscarInfo() {

        const auth = getAuth()
        const user = auth.currentUser
 
        if(!auth || !user || !day) return
        
        const docRef = doc(db, "Usuario", user.uid, "eventos", day)
        const snap = await getDoc(docRef)

        if(snap.exists()){
            setInformacoes(snap.data())
        }

    }


    async function adicionarInfo() {
        
        const auth = getAuth()
        const user = auth.currentUser

        if(!user || !day) return
        
        const ref = doc(db, "Usuario", user.uid, "eventos", day)

        await setDoc(ref, {
            titulo: "",
            descricao: "",
            createdAt: new Date()
        })

    }


    useEffect(() => {

        buscarNome()
        buscarInfo()

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

        <>
        
        <Header></Header>
        
        </>
    )

}