"use client"
//aqui se usara en todos lados tambien esta aqui su skeleton loader
import producto from "./producto-item.module.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
export function SkeletonProductoItem() {

}

//aqui por prop se tiene que recibir cuando se termine de cargar 
export function ProductoItem({ data, delayAnimation }) {
    const router = useRouter()


    const clickProducto = () => {
        //aqui con la data que nos llega ponemos la url que corresponde
        router.push(`/product/${data.idProducto}/${data.nombre_producto}`)
        //router.push(`/product/${data.nombre_producto}/${data.idProducto}`)
    }



    useEffect(() => {
        console.log("esta data es de producto-item")
        console.log(data)
    }, [])

    return (
        <>
            {data.firstUrlImagen == null ? null:
                <div className={producto.productoItem}
                    style={{/*animation:`${producto.entrada} 700ms ease forwards ${delayAnimation}ms`*/ }}
                    onClick={clickProducto}>
                    <div className={producto.imagen}>
                        {/*<img src={`/${data?.firstUrlImagen}`}/>*/}
                        <img src={data.firstUrlImagen}></img>

                    </div>
                    <div className={producto.infoBoton}>
                        <p>{data?.nombre_producto}</p>
                        <button>{data?.precio_en_dolares}USD</button>
                    </div>
                </div>
            }

        </>
    );
}