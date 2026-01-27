
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, onSnapshot } from "firebase/firestore"
import { auth, db } from "../services/firebase"
import { useEffect, useState, type FormEvent } from "react";

export default function CalendarDay(){

    const {day} = useParams<{ day: string }>()
    const navigate = useNavigate()
    const[tamanhoTela, setTamanhoTela] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const[informacoes, setInformacoes] = useState<any[]>([])
    const[titulo, setTitulo] = useState("")
    const[descricao, setDescricao] = useState("")




useEffect(() => {
  const auth = getAuth()

  const unsubAuth = onAuthStateChanged(auth, (user) => {
    if (!user || !day) return

    const ref = collection(
      db, 
      "Usuario",
      user.uid,
      "eventos",
      day,
      "lista"
    )

    const q = query(ref, orderBy("createdAt", "asc"))

    const unsubData = onSnapshot(q, (snap) => {
      const dados = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      console.log("EVENTOS:", dados)
      setInformacoes(dados)
    })

    return () => unsubData()
  })

  return () => unsubAuth()
}, [day])


    async function adicionarInfo(e: FormEvent) {


        e.preventDefault()
        

        const user = auth.currentUser

        if(!user || !day) return

        await addDoc(collection(db, "Usuario", user.uid, "eventos", day, "lista"), {
            titulo,
            descricao,
            createdAt: serverTimestamp()
        })

        .then(() => {
            setTitulo("")
            setDescricao("")

        })

        console.log("DAY:", day)


    }


    useEffect(() => {


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

        <form onSubmit={adicionarInfo}>
            <input type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            ></input>
            <input type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            />
            <button type="submit" onClick={() => {console.log(informacoes)}} className="cursor-pointer">Adicionar</button>
        </form>

        {
            informacoes.map((info) => (
                <>
                
                {info.titulo} <br />
                {info.descricao} <br /> <br />
                </>
            ))
        }
        
        </>
    )

}