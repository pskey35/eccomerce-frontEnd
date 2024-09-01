"use client"
import {useEffect,useState,useContext,createContext} from "react"
import io from "socket.io-client"


//la seccion de meter tarjeta o asi copiar el diseño de planetScale de ahi se ve piola
//const socket = io(`${process.env.NEXT_PUBLIC_serverSockets}`)
const socket = io(`${process.env.NEXT_PUBLIC_serverSockets}`)
export const ContextCheckoutLayout = createContext()

export default function Layouts({children}){
	const [dataCarritoForCaja,setDataCarritoForCaja] = useState([])


	//este loader servira para todas las subrutas de checkout 
	const [skeletonLoader,setSkeletonLoader] = useState(true)

	useEffect(()=>{
		const giveProductsForCarroCaja = (dataRecibido)=>{
			setDataCarritoForCaja(dataRecibido)
			console.log("esto es tu dataCarrito para la caja")
			console.log(dataRecibido)
			setSkeletonLoader(false)
		}

		const prodCar = localStorage.getItem("prodCar")
		if(prodCar){
			socket.emit("envioGiveAllProductsCar",{idCar:prodCar})
			socket.on("give_all_products_car",giveProductsForCarroCaja)
		}

		return (() => {
     	   socket.off("give_all_products_car", giveProductsForCarroCaja)
  		})
	},[])


	const value = {dataCarritoForCaja,skeletonLoader}
	return(
       	<ContextCheckoutLayout.Provider value={value}>
		    {children}
		</ContextCheckoutLayout.Provider>

			)
}