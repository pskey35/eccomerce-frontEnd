"use client"
import page from "./page.module.css"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { useState, useEffect, useContext, createContext } from "react"
import { useRouter } from "next/navigation"
import { ContextGlobal } from "@/app/layout"
import NotFound from "@/app/not-found"
import { ProductoItem } from "@/components/producto-item"



/*-------------SECCION DE SKELETONS-----------*/
function SkeletonProducto() {

    return (
        <div className={page.ldngProducto}>
            <div className={page.ldngLeft}>
                <div className={page.ldngContenidoImagen}>
                    <div className={page.ldngImagen}></div>
                </div>
                <div className={page.ldngOtherImages}>
                    <div className={page.ldngOtherImages_content}>
                        <div className={page.ldngItemImages}></div>
                        <div className={page.ldngItemImages}></div>
                        <div className={page.ldngItemImages}></div>
                    </div>
                </div>
            </div>
            <div className={page.ldngRight}>
                <div className={page.ldngRight_content}>
                    <div className={page.ldngH1}></div>
                    <div className={page.ldngPrecio}></div>
                    <div className={page.ldngDescripcion}>
                        <div className={page.ldngParrafo}></div>
                        <div className={page.ldngParrafo}></div>
                        <div className={page.ldngParrafo}></div>
                        <div className={page.ldngParrafo}></div>
                    </div>
                    <div className={page.ldngAddCarrito}></div>
                </div>
            </div>
        </div>
    )
}












//aqui falta ponerle un skeleton
function Relacionados() {
    return ("")
}

//no puedo dormir si tu te vas song .....Youtube

function ProductoLeft() {
    const { dataProducto, idProduct, productName, principalImage, setPrincipalImage, queryParams } = useContext(ContextProduct)

    const router = useRouter()



    const [indiceImg, setIndiceImg] = useState()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let imgIndex = parseInt(params.get('indiceImg'))
        setIndiceImg(imgIndex)
    }, [])

    const clickItemImagen = (indiceRecibido) => {
        //const url = `product/${productName}?indiceImg=${indiceRecibido}/${idProduct}`
        //  alert(`/product/${productName}?indiceImg=${indiceRecibido}/${idProduct}`)
        //   router.push(`/product/${productName}?indiceImg=${indiceRecibido}%2F${idProduct}`)
        // router.push(`/product/${productName}${ind}/${idProduct}`)
        // router.push(`/product/hola?games=1`)
        router.push(`/product/${idProduct}/${productName}?indiceImg=${indiceRecibido}`)

        //console.clear()
        //  console.log(indiceRecibido)
        //alert(indiceRecibido)
        setPrincipalImage(indiceRecibido - 1)



    }




    const clickFlechaNextImage = (event) => {


        const product_flechaPrev = document.querySelector(".product_flechaPrev")
        product_flechaPrev.style.cssText = "opacity:1;cursor:pointer;"

        if (queryParams == dataProducto.allImgs.length) {
            event.preventDefault()
            return;
        }

        setPrincipalImage(prevState => {
            // console.clear()
            console.log("NEXTTT")
            console.log("dataProducto.length", dataProducto.allImgs.length)
            console.log("prevState", prevState)
            console.log("queryParams", queryParams)
            if (queryParams >= dataProducto.allImgs.length || prevState == undefined) {

                const product_flechaNext = document.querySelector(".product_flechaNext")
                //  product_flechaNext.style.cssText = "opacity:0.2;cursor:not-allowed"
                return;
            }
            router.push(`/product/${idProduct}/${productName}?indiceImg=${prevState + 2}`)
            return prevState + 1

        })



    }



    const clickFlechaPrevImage = () => {
        const product_flechaNext = document.querySelector(".product_flechaNext")
        product_flechaNext.style.cssText = "opacity:1;cursor:pointer;"
        setPrincipalImage(prevState => {
            //console.clear()
            console.log("PREVVV")
            console.log(prevState)
            if (prevState <= 0 || prevState == undefined) {

                const product_flechaPrev = document.querySelector(".product_flechaPrev")
                product_flechaPrev.style.cssText = "opacity:.2;cursor:not-allowed"
                return;
            }
            router.push(`/product/${idProduct}/${productName}?indiceImg=${prevState}`)
            return prevState - 1
        })
    }







    return (
        <div className={page.left}>
            <div className={page.contenidoImagen}>
                <img src={`${dataProducto.allImgs[principalImage == undefined ? 0 : principalImage].imagenUrl}`} className={page.fondoImagen}></img>

                <div className={page.imagen}>


                    <img src={`${dataProducto.allImgs[principalImage == undefined ? 0 : principalImage].imagenUrl}`}></img>




                </div>
                {dataProducto.allImgs.length == 1
                    ? "" :
                    (
                        <div className={page.flechas}>
                            <div className={page.flechas_content}>
                                <div onClick={clickFlechaPrevImage} className="product_flechaPrev">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg>
                                </div>
                                <span className={page.linea}></span>
                                <div onClick={clickFlechaNextImage} className="product_flechaNext">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                                </div>
                            </div>
                        </div>)
                }
            </div>
            {dataProducto.allImgs.length == 1/*si existe solo una imagen no se muestra este div.otherImages */
                ? "" :
                (<div className={page.otherImages}>
                    <div className={page.otherImages_content}>
                        {dataProducto.allImgs.map((dataUnidad, indice) => {
                            console.log("444444444444444444444444")
                            console.log(queryParams)
                            console.log(queryParams, indice + 1)
                            return (
                                <div className={`${page.itemImagen} ${queryParams - 1 === indice ? page.selected : ""}`} key={indice} onClick={() => clickItemImagen(indice + 1, dataUnidad.imagenUrl)}>
                                    <img src={`${dataUnidad.imagenUrl}`}></img>
                                </div>
                            )
                        })}
                    </div>
                </div>)}

        </div>
    )
}


function ProductoRight() {
    //aqui se deberia de obtener la data del producto ps haciendo fetch xd
    //  const [dataProducto, setDataProducto] = useState()
    const { dataProducto, idProduct } = useContext(ContextProduct)
    const { setModifyProduct } = useContext(ContextGlobal)
    //esto es para el carrito cuando se hace click en addProducto se usa el SetDataCarrito y para que vaya agregando ps el data carrito: s
    //setDataCarrito([...dataCarrito,{nuevoProductoEjemplo:"23"}])
    const { setDataCarrito, dataCarrito, abrirCarritoFuncion } = useContext(ContextGlobal)


    //este loader es para cuando den click al boton de agregar al carrito
    const [loader, setLoader] = useState(false)

    const [contClickBotonAdd, setClickBotonAdd] = useState(0)

    const [savedDataInDatabase, setSaveDataInDatabase] = useState(null)

    useEffect(() => {
        const addProductoAsync = async () => {
            const addCarrito_contentElement = document.querySelector(`.${page.addCarrito_content}`)
            setLoader(true)


            addCarrito_contentElement.style.cursor = "not-allowed"
            console.log("click addProducto")
            //veremos si ya existe el id de productos del carrito = prodCar
            const getIdCarrito = localStorage.getItem("prodCar")

            if (!getIdCarrito) {
                //creo que lo mejor seria generar el uuid en el frontend o quiza no ..nose xd
                console.log("no existe el idCarrito por eso se creara")
                const query = `query{giveIdCar(idProducto:"${idProduct}")}`
                const peticion = await fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
                    method: "POST",
                    headers: {
                        "Content-type": "Application/json"
                    },
                    body: JSON.stringify({ query })
                })
                const resu = await peticion.json()
                localStorage.setItem("prodCar", resu.data.giveIdCar)

            }

            //seleccionamos otra vez el idCar porque recien se habia creado pues
            const getIdCarrito2 = localStorage.getItem("prodCar")
            const query = `query{existProductInCarUser(idCar:"${getIdCarrito2}",idProducto:"${idProduct}")}`
            //si tiene el idCarrito entonces enviar idProducto y ver si ya esta registrado en database para no insertar mas
            const peticion = await fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ query })
            })
            const resu = await peticion.json()
            //  console.log("###")
            //   console.log(resu)
            if (resu.data.existProductInCarUser) {
                //si existe ese idProduct en la database entonces solamente
                //le pones un update y nada mas

                console.log("addProducto ")
                const query2 = `mutation{addProducto(idCar:"${getIdCarrito2}",idProducto:"${idProduct}"){
                 error,
                 cantidadProducto
             }}`
                const peticion2 = await fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ query: query2 })
                })

                const resu = await peticion2.json()


                setDataCarrito(prevState => {
                    let newItems = [...prevState]
                    newItems.map((dataUnidad, indice) => {
                        if (dataUnidad.idProducto == idProduct) {
                            //en el prevState si encontramos un objeto con el mismo idProducto con el que estamos agregando
                            //usamos el indice y a ese objeto en particular solo le cambiamos con el nuevo cantidadProducto del fetch
                            newItems[indice].cantidadProducto = resu.data.addProducto.cantidadProducto
                        }
                    })

                    return newItems;
                })
                setLoader(false)

                addCarrito_contentElement.style.cursor = "pointer" //
                setSaveDataInDatabase(true)
                abrirCarritoFuncion(true)
                setModifyProduct(prev => !prev)
                console.log("ya existia en carro")
            } else {
                //si no existe es porque por primera vez esta agregando este producto
                //y esto insertara el producto a la database ya que se supone que ese producto no lo tenia agregado
                // console.log("primera vez que se introduce este producto al carrito del user")

                //seleccionamos otra vez idCar porque recien se habia creado
                console.log("no existia en carroTemporal")
                const getIdCarrito = localStorage.getItem("prodCar")


                const query2 = `mutation{giveDataFirstProductAdded(idCar:"${getIdCarrito}",idProducto:"${idProduct}"){
                 nombre_producto,
                 precio_en_dolares,
                 imgUrl_first,
                 cantidadProducto,
                 error,
                 idProducto
             }}`


                const peticion2 = await fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ query: query2 })
                })

                const resu = await peticion2.json()
                //   console.log("producto ingresado por primera vez")
                //   console.log(resu)
                console.log("****")
                console.log(resu.data)
                setDataCarrito([...dataCarrito, resu.data.giveDataFirstProductAdded])
                setLoader(false)

                addCarrito_contentElement.style.cursor = "pointer"
                setSaveDataInDatabase(true)
                abrirCarritoFuncion(true)
                setModifyProduct(prev => !prev)

            }
        }

        if (savedDataInDatabase == false) {
            addProductoAsync()
        }

    }, [savedDataInDatabase])

    const clickAddProducto = () => {
        //iniciamos en false porq aun no se ha completado toda la carga
        setSaveDataInDatabase(false)


    }



    return (
        <div className={page.right}>
            <div className={page.right_content}>
                <h1>{dataProducto.nombre}</h1>
                <div className={page.precio}>
                    {dataProducto.precio} <span style={{ fontSize: "16px", fontWeight: 700 }}>USD</span>
                </div>
                <span className={page.right_linea}></span>
                <div className={page.descripcion}>
                    {dataProducto.descripcion}
                </div>
                <div className={page.addCarrito}>
                    <div className={page.addCarrito_content} onClick={clickAddProducto}>
                        <div className={page.iconoAdd}>
                            {loader
                                ?
                                <div className={page.circles}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" aria-hidden="true" class="h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
                            }
                        </div>
                        <div className={page.texto}>Agregar al carrito</div>
                    </div>
                </div>
            </div>
        </div>
    )
}





function ProductosRelacionados() {
    const [productosRelacionados, setProductosRelacionados] = useState([])
    const { dataProducto } = useContext(ContextProduct)
    const [loaderProductos, setLoaderProductos] = useState(false)

    const [numeroDePagina, setNumeroDePagina] = useState(1)


    let newNumeroDePagina = numeroDePagina

    const loadMoreProductos = async (entrada) => {
        if (entrada[0].isIntersecting) {

            setLoaderProductos(true)
            newNumeroDePagina++
            const detect = document.querySelector(`.${page.detect}`)
            observador.unobserve(detect)



            const query1 = `query{getProducts(texto_a_buscar:"null",categoria:"${dataProducto.categoria}",numeroDePagina:${newNumeroDePagina},itemsPorPagina:6)
            {
                nombre_producto,
                precio_en_dolares,
                firstUrlImagen,
                categoria,
                idProducto
            }
        }`


            const peticion1 = await fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ query: query1 })
            })

            const resu1 = await peticion1.json()

            console.log("*********")
            console.log(resu1)
            setProductosRelacionados(prevState => [...prevState, ...resu1.data.getProducts])
            setLoaderProductos(false)

            //si ya no encuentra nada entonces borramos todo el observer
            if (resu1.data.getProducts.length == 0) {
                console.log("deleting allx d")
                observador.unobserve(detect)
            } else {
                setNumeroDePagina(newNumeroDePagina)
                funcionObservador()
            }
        }
    }

    const observador = new IntersectionObserver(loadMoreProductos, {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0
    })

    const funcionObservador = () => {
        const detect = document.querySelector(`.${page.detect}`)
        observador.observe(detect)
    }

    useEffect(() => {


        const query = `query{getProducts(texto_a_buscar:"null",categoria:"${dataProducto.categoria}",numeroDePagina:1,itemsPorPagina:6){
            nombre_producto,
           precio_en_dolares,
           firstUrlImagen,
           idProducto,
           categoria
        }}`

        alert(query)
        
        fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ query })
        }).then(e => e.json())
            .then(e => {
           
                console.log("**********************")
                console.log(e)
                setProductosRelacionados(e.data.getProducts)
                // console.clear()
                //cada vez que detecte que llego hasta abajo se hara mas peticiones
                funcionObservador()
            })
    }, [])

    return (
        <div className={page.relacionado}>
            { /*<h1>Productos relacionados</h1>*/}
            <h1>Otros productos</h1>
            <div className={page.relacionado_content}>
                {productosRelacionados && productosRelacionados.map((dataUnidad, indice) => {
                    return (

                        <ProductoItem key={dataUnidad.idProducto} data={dataUnidad}></ProductoItem>

                    )
                })}
                <div className={page.detect}></div>
                {
                     loaderProductos && (loaderProductos ? <div className={page.loader}></div> : "")
               
                }

           



            </div>
        </div>
    )
}


const ContextProduct = createContext()



export default function Producto(props) {
    console.log(props)
    const [dataProducto, setDataProducto] = useState({})


    //esto es para el skeleton del .container > .producto
    const [loadingProducto, setLoadingProducto] = useState(true)


    //esto lo usare para redirigir en clickItemImagenes usar query y poner /idProductName?imgIndice=1/idProduct
    const productName = decodeURIComponent(props.params.productName)

    //este router es para redirigir en next js
    const router = useRouter()


    //este queryParams en si seria solo el ?indiceImg=2     necesito en si para poder cambiar de imagen con useEffect 
    const queryParams = props.searchParams.indiceImg


    //este es para la imagen mas grande de product 
    const [principalImage, setPrincipalImage] = useState(queryParams)


    //esto de productName lo usare solo para ponerlo en el context y poder hacer validaciones etc....
    const idProduct = props.params.idProduct

    //aqui sirve para ver si lo que puso en la url esta bien sino para mostrarle el nout-found.jsx
    const [productoExiste, setProductoExiste] = useState(true)


    useEffect(() => {
        const query = `query{giveInfoProducto(idProducto:"${idProduct}",nombreProducto:"${productName}"){
            nombre,
            descripcion,
            precio,
            allImgs{imagenUrl},
            categoria
            error
        }}`
        fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ query })
        }).then(e => e.json())
            .then(e => {
                console.log("@@@@@@")
                console.log(e)
                //dataProducto..allImgs[0].imagenUrl
                console.log(e.data.giveInfoProducto)
                if (e.data.giveInfoProducto.error == true) {
                    setProductoExiste(false)
                }
                setDataProducto(e.data.giveInfoProducto)
                setLoadingProducto(false)
            })

    }, [])


    useEffect(() => {


        if (!queryParams) {
            //si no tiene ninguna query entra aqui
            router.push(`/product/${idProduct}/${productName}?indiceImg=${1}`)
            // setPrincipalImage(0)
            //  alert("!queryparamas")
            return;
        } else if (isNaN(queryParams) || queryParams <= 0) {
            router.push(`/product/${idProduct}/${productName}?indiceImg=${1}`)
            return;
        }


        //se resta -1 los arrays en js se inician desde el cero pero este queryParams en la url no se va a iniciar 
        //desde 0 sino desde el 1 para mejorar la experiencia del usuario
        //  alert(queryParams)
        //alert(queryParams - 1)
        setPrincipalImage(queryParams - 1)
        // setPrincipalImage(queryParams + 1)

        // setPrincipalImage(prevState => prev)



        //si las imagenes del producto son como 4 asi 
        //tiene que ser mayor de queryParams
        //http://localhost:3000/product/BgT/real?indiceImg=1


        if (loadingProducto == false) {
            //esperamos a que loadingProducto termine de cargar para recien
            //acceder a dichos elementos , caso contrario me salia error
            if (queryParams == 1) {
                //si en la url indiceImg es igual a 1 entonces entra aqui

                const product_flechaNext = document.querySelector(".product_flechaNext")
                product_flechaNext.style.cssText = "opacity:1, cursor:pointer"


                const product_flechaPrev = document.querySelector(".product_flechaPrev")
                product_flechaPrev.style.cssText = "opacity:0.2;cursor:not-allowed"
                return;
            } else if (queryParams == dataProducto?.allImgs?.length) {
                //esto sirve para ver si en la url indiceImg es el ultimo imagen para pintar la flecha
                const product_flechaPrev = document.querySelector(".product_flechaPrev")
                product_flechaPrev.style.cssText = "opacity:1;cursor:pointer;"

                const product_flechaNext = document.querySelector(".product_flechaNext")
                product_flechaNext.style.cssText = "opacity:0.2;cursor:not-allowed"
                return;
            } else if (queryParams > dataProducto?.allImgs?.length || queryParams < dataProducto?.allImgs?.length || queryParams == 0) {
                ///real?indiceImg=1 -- aqui el queryParams vendria a ser el uno
                router.push(`/product/${idProduct}/${productName}?indiceImg=${1}`)

            }


        }

    }, [queryParams, dataProducto, loadingProducto])




    const value = { dataProducto, idProduct, productName, principalImage, setPrincipalImage, queryParams }
    return (
        <ContextProduct.Provider value={value}>
            {
                productoExiste ? (<div className={page.ventana}>
                    <Header></Header>

                    <div className={page.container}>
                        {loadingProducto ? <SkeletonProducto></SkeletonProducto> : (
                            <>
                                <div className={page.producto}>
                                    <ProductoLeft></ProductoLeft>
                                    <ProductoRight></ProductoRight>
                                </div>
                                <ProductosRelacionados></ProductosRelacionados>
                            </>
                        )}

                    </div>
                    <Footer></Footer>
                </div>) : <NotFound></NotFound>
            }

        </ContextProduct.Provider>
    )
}

