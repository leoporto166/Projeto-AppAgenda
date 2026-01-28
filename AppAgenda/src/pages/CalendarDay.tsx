
import {  useParams } from "react-router-dom";
import Header from "../components/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection,  orderBy, query, serverTimestamp, onSnapshot, deleteDoc } from "firebase/firestore"
import { auth, db } from "../services/firebase"
import { useEffect, useState, type FormEvent } from "react";
import { doc } from "firebase/firestore";

export default function CalendarDay(){

    const {day} = useParams<{ day: string }>()
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

    async function Excluir(idEvento: string) {

        const user = auth.currentUser

        if (!user || !day) return

        const ref = doc(db, "Usuario", user.uid, "eventos", day, "lista", idEvento)
        deleteDoc(ref)

        .then(() => {
            console.log("DELETOU")
        })

        


    }

    return(

        <>
        
        <Header></Header>

        <form onSubmit={adicionarInfo} className="flex flex-col w-8/12 mt-2">
            <input type="text"
            placeholder="Titulo"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="my-2 border-b border-black/50 bg-transparent outline-none focus:bg-green-100/50"
            ></input>
            <input type="text"
            placeholder="Decrição"
            required
            className="mb-2 border-b border-black/50 bg-transparent outline-none focus:bg-green-100/50"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            />
            <button type="submit" onClick={() => {console.log(informacoes)}} className="cursor-pointer bg-green-500 rounded mt-2 text-white">Adicionar</button>
        </form>

        {
            informacoes.map((info) => (
                <div className="mt-10">
                
                {info.titulo} <button className="bg-red-600 text-white p-1 rounded" onClick={() => {Excluir
                    (info.id)
                }}>Excluir</button><br />
                {info.descricao}<br /> <br />
                </div>
            ))
        }
        
        </>
    )

}