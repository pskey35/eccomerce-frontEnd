"use client"
import "./globals.css"
import { useContext, createContext, useState, useEffect } from "react"

export const ContextGlobal = createContext()
export default function RootLayout({ children }) {
  //en este estado se guardaran los datos para los componentes del carrito
  //estos datos se llenan en la ruta /product/[productName]/[idProduct] se usa el ContextGLobal 
  //y de aqui se pasa al componente header.jsx
  const [dataCarrito, setDataCarrito] = useState([])

  //este estado servira para que en el /product se use ese estado si se resta suma o elimina
  //
   const [modifyProduct,setModifyProduct] = useState(null)
  
  //esto de aqui de abrir  carrito se usara en /product/[productName]/[idProduct]
  //para abrirlo cuando se de click en el boton "agregar al carrito"
  //para eso lo sacamos del componente header.jsx
    const [abrirCarritoFuncion, setAbrirCarritoFuncion] = useState(null)


    //esto sera para el input en el archivo Header -- es que necesito limpiar cada vez que se da click en categorias en /search
    const [inputHeader,setInputHeader] = useState()
  


  //buscar lo de midudev spotify video era de como construir clon creo.
  //ahi decia que iba a enseñar estado persistente yo solamente opte por usar sessionstorage o localstorage

  useEffect(() => {


  }, [abrirCarritoFuncion])

  const value = { dataCarrito, setDataCarrito, setAbrirCarritoFuncion,abrirCarritoFuncion,modifyProduct,setModifyProduct,inputHeader,setInputHeader}



  return (
    <html lang="en">
      <body>
        <ContextGlobal.Provider value={value}>
          <div className="globals">
            {children}
          </div>
        </ContextGlobal.Provider>
      </body>
    </html>
  )
}


