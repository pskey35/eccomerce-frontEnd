"use client"
//aqui se tiene que verificar si tiene el token sino redirigir
import { useRef, useState,useEffect } from "react"
import page from "./page.module.css"



export default function App() {

    const adminName = useRef()
    const passwordAdmin = useRef()

    const [mensaje,setMensaje] = useState("creado por Jayme_Ln")
    const [error,setError] = useState(null)
    const clickAcceder = () => {
        //enviamos la data al backend y vemos si esta registrado

        const query = `mutation{loginUser(user:"${adminName.current.value}",password:"${passwordAdmin.current.value}"){
            error,
            mensaje,
            token
        }}`
        fetch("http://localhost:8000/graphql", {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body:JSON.stringify({query})
        }).then(e=>e.json())
        .then(e=>{
            if(e.data.loginUser.token !== null){
                localStorage.setItem("tkn",e.data.loginUser.token)
                
                setTimeout(()=>{
                    window.location = "/admin"
                },3000)
            }
        
            setMensaje(e.data.loginUser.mensaje)
            setError(e.data.loginUser.error)
        })

    }


    useEffect(()=>{
        const getToken = localStorage.getItem("tkn")
        if(getToken){
            //si tiene el token se redirige a la ruta /admin
            window.location = "/admin"
        }
    },[])
    return (
        <div className={page.ventana}>
            <div className={page.container}>
                <div className={page.formulario}>
                    <div className={page.left}>
                        <img src="/images/twitter.svg"></img>
                    </div>
                    <div className={page.right}>
                        <div className={page.right_content}>
                            <h1>Space Digital</h1>
                            <div className={page.logo}>
                                <img src="/parrot.jpg"></img>
                            </div>
                            <div className={page.inputs}>
                                <div><input type="text" placeholder="Introduce tu nombre de administrador" ref={adminName}/></div>
                                <div><input type="password" placeholder="Introduce tu password" ref={passwordAdmin}/></div>
                                <div className={page.login} onClick={clickAcceder}>
                                    Iniciar Sesión
                                </div>
                            </div>
                            <div style={{color:error?"red":"green",textAlign:"center",visibility:error !== null ?(error?"visible":"visible"):"hidden"}}>{mensaje}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}