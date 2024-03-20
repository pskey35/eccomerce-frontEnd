import header from "./header.module.css";
import { useState, createContext, useContext, useRef, useEffect } from "react";
import Link from "next/link"
import { ContextGlobal } from "@/app/layout"
import io from "socket.io-client"
import {useRouter} from "next/navigation"


const socket = io("http://localhost:9000");

export function Input() {
  const inputSearch = useRef()
  const router = useRouter()
  const sugerenciasInputRef = useRef()

  const {setInputHeader} = useContext(ContextGlobal)
  
  useEffect(() => {
   inputSearch.current.value = new URL(window.location.href).searchParams.get("q")
   
   const inputChild = document.querySelector(`.${header.inputChild} > input`)
   //ponemos esto en el Context global para usarlo en el /search y poder limpiar cuando se da click en categorias al input
   setInputHeader(header)
  }, [])

  const [listaSugerencias, setListaSugerencias] = useState([])
  // const { mostrarMenu, setAnimMenu, setMostrarMenu } = useContext(ContextHeader)
  //onKeyUp


  //esta funcion es la del "click" evento es que quiero saber cual es el siguiente click del usuario

  let clickAfuera = null;
  function funcionNextClick(event) {
    //aqui nose requiere del i> 1 porq se esta llamando dentro de un onInput y no de un onClick como normalmente lo solia usar
    //osea que la funcion window.addEvent..... se llama en keyValueInput y este es de tipo onInput 

    //aqui para determinar el siguiente click


   // console.log("determinando siguiente click....")
    const sugerenciasListaElements = document.querySelectorAll(`.${header.sugerenciasInput_content} > div`)
    const idElementoClick = event.target.getAttribute("id")
    //console.log(sugerenciasListaElements)
    //console.log("idelementoClick:" + idElementoClick)
    //este idElementoClick para evitar errores
    if (idElementoClick) {

      for (let e = 0; e < sugerenciasListaElements.length; e++) {
        //si no es igual entonces le ponemos clickAfuera = true;
        if (idElementoClick !== sugerenciasListaElements[e].getAttribute("id")) {
          clickAfuera = false;
        } else {
          clickAfuera = true;
        }
      }
    } else if (idElementoClick == "wazaInput") {
      clickAfuera = false;
    } else {
      clickAfuera = true;
    }

    //console.log("clickAfuera:" + clickAfuera)
    //como todo esto es asincrono(osea espera paso por paso) al final vemos que si clickAfuera es true
    if (clickAfuera) {
      //si es true entonces quitamos el sugerenciasElement
      //  const sugerenciasCajaElement = document.querySelector(`.${header.sugerenciasInput}`)
      // sugerenciasCajaElement.style.cssText = "visibility:hidden;opacity:0"


      //verificamos que este definido sale error porque porque seguro es porque se reutiliza 
      //el input de mobile desaparece en en pc pero con un display none por eso no lo encuetnra
      if (sugerenciasInputRef.current) {
        sugerenciasInputRef.current.style.cssText = "visibility:hidden;opacity:0"
       
       // console.log("AAAAAAAAAAAA")
       // console.log(sugerenciasInputRef)
      }

      window.removeEventListener("click", funcionNextClick)
    }


  }

  const keyValueInput = (e) => {
    //aqui recortamos el valor por si tiene mas de un espacio
    const valorRecortado = inputSearch.current.value.replace(/\s+/g, " ").trim();

    if (valorRecortado.length > 0) {
      ///console.log("Holalaa")
      //esto es  si se preciona ENTER
      if (e.keyCode == 13) {
        //verificar si esta el menu activo y si lo esta, quita el menu
        //aqui para el MENU crearemos un componente especial porque este input lo requiero en otros archivos
        //rutas /home y /search
        /*  if (mostrarMenu) {
            setAnimMenu(false)
            setTimeout(() => {
              setMostrarMenu(false)
            }, 400)*/
        //redirect(`/search?q=${valorRecortado}`)
        router.push(`/search?q=${valorRecortado}`)
      }

      //aqui usaremos fetch para mostrar sugerencias hay una tecnica llamada bounce usar eso
      const query = `query{giveSugerenciasInput(textoSearch:"${valorRecortado}"){
        nombre_producto
      }}`

      fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json"
        },
        body: JSON.stringify({ query })
      }).then(e => e.json())
        .then(e => {
         // console.log(e)
          setListaSugerencias(e.data.giveSugerenciasInput)

          if (e.data.giveSugerenciasInput.length == 0) {

            sugerenciasInputRef.current.style.cssText = "visibility:visible;opacity:1;height:30px;"
          } else {



            //aqui puse * 29 porq cada ItemLista mide eso con todo y padding
            const calcularHeight = 29 * e.data.giveSugerenciasInput.length  
            
            //aqui sume +2 porque si no aparecia el scroll de overflow bueno eso lo soluciona
            sugerenciasInputRef.current.style.cssText = `visibility:visible;opacity:1;height:${calcularHeight + 2}px;max-height:400px;overflow:auto`




          }

          //este evento click es para determinar donde sera su siguiente click para poder cerrar ese cuadro ps xd
          window.addEventListener("click", funcionNextClick)

        })

    } else if (e.target.value.length == 0) {
      //si en caso de que el usuario escribio texto y luego borro todo eso de quitar esa sugerenciasElement

      sugerenciasInputRef.current.style.cssText = "visibility:hidden;opacity:0"

    }

  }


  const clickSugerenciaItem = (textoRecibido) => {

    //redirigimos a su busqueda
    router.push(`/search?q=${textoRecibido}`)
    inputSearch.current.value = textoRecibido

    //quitamos las sugerencias una vez dado click ya que como es a la misma pagina que redirige
    //ps no recarga ni nada lo cual es bueno para el performance xd

    sugerenciasInputRef.current.style.cssText = "visibility:hidden;opacity:0"
  }


  //cada itemLista mide 29px con todo y padding
  //



  const clickSearch = () => {
    const valorRecortado = inputSearch.current.value.replace(/\s+/g, " ").trim()
    if (valorRecortado.length > 0) {
      sugerenciasInputRef.current.style.cssText = `visibility:visible;opacity:1`


      //este evento click es para determinar donde sera su siguiente click para poder cerrar ese cuadro ps xd
      window.addEventListener("click", funcionNextClick)
    }
  }

  const clickLupa = ()=>{

    //aqui basicamente hace todo como si hubiera sido dado click a uno de los items de sugerencias
    clickSugerenciaItem(inputSearch.current.value)
  }
  return (
    <div className={header.inputContainer} >
      <div className={header.inputChild}>
        <input autocomplete="off" ref={inputSearch} onClick={clickSearch} onKeyUp={keyValueInput} id="wazaInput" type="text" placeholder="Buscar productos..." />
        <span onClick={clickLupa}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" aria-hidden="true" class="h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
        </span>
      </div>
      <div className={header.sugerenciasInput} ref={sugerenciasInputRef}>
        <div className={header.sugerenciasInput_content}>
          {listaSugerencias.length == 0 ?
            (
              <div className={header.noExiste} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div style={{height:"20px",width:"20px",marginRight:"5px"}}>
                  <svg style={{height:"100%",width:"100%"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="exclamation-triangle"><path fill="#e55119" d="M12,16a1,1,0,1,0,1,1A1,1,0,0,0,12,16Zm10.67,1.47-8.05-14a3,3,0,0,0-5.24,0l-8,14A3,3,0,0,0,3.94,22H20.06a3,3,0,0,0,2.61-4.53Zm-1.73,2a1,1,0,0,1-.88.51H3.94a1,1,0,0,1-.88-.51,1,1,0,0,1,0-1l8-14a1,1,0,0,1,1.78,0l8.05,14A1,1,0,0,1,20.94,19.49ZM12,8a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V9A1,1,0,0,0,12,8Z"></path></svg>
                </div>
                <div>no se encontró tu busqueda</div>
              </div>
         
            ) :
            (
              listaSugerencias.map((dataUnidad, indice) => {
                return (
                  <div key={`sugerencia-${indice}`}
                    id={`sugerenciaID_${indice}`}
                    onClick={() => clickSugerenciaItem(dataUnidad.nombre_producto)}
                  >
                    {dataUnidad.nombre_producto}
                  </div>
                )
              })
            )
          }
        </div>
      </div>
    </div>
  );
}



function ProductoCar({ data, id, indice }) {
  //el indice lo usare para saber que posicion del producto es el que esta sumando o restando para actualizar el estado carrito
  const { setConteoCar } = useContext(ContextHeader)
  const { dataCarrito, setDataCarrito,setModifyProduct } = useContext(ContextGlobal)

  //este loader es para cuando se da click en borrarProducto sumar o restar
  const [loader, setLoader] = useState({
    deleteLoader: { isLoading: false, saveInDatabase: null },
    sumaLoader: { isLoading: false, saveInDatabase: null },
    restaLoader: { isLoading: false, saveInDatabase: null }
  }
  )


  const ekisElementRef = useRef()
  const sumaElementRef = useRef()
  const restaElementRef = useRef()

  const clickBorrarProducto = (idRecibido) => {
   // console.log("borrando.....")
    const ekisElement = ekisElementRef.current
   // console.log(ekisElement)
    ekisElement.style.cursor = "not-allowed"
    setLoader(prevState => ({
      ...prevState,
      deleteLoader: { isLoading: true, savingInDatabase: false }
    }))



   // console.log("borrando producto....")
    //primero se elimina el producto de la database y luego recien se ejecuta la animacion esa de eliminacion
    const prodCar = localStorage.getItem("prodCar")



    const query = `mutation{deleteProducto(idCar:"${prodCar}",idProducto:"${idRecibido}"){
      error
    }}`


    fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify({ query })
    }).then(e => e.json())
      .then(e => {


        if (e.data.deleteProducto.error == false) {

          const x = document.querySelector(`#prod-${idRecibido}`)
          //x.style.opacity = "0"
          //x.style.animation = "salidaProducto 1s ease"
          /* x.style.animationName = "salidaProducto";
           x.style.animationDuration = "1s";*/

          //aqui hay un error en la animacion a la hora de eliminar un producto
          //aqui no se nota ese error porque pasa rapido pero hay un pequeño transicion brusco
          //ese error era por el margin creo ya no me acuerdo
          //busca el archivo errorAnimacion.html ahi solucionalo
          x.style.animation = `${header.salidaProducto} 200ms ease forwards`
          setTimeout(() => {
            x.style.height = "0px"
            setTimeout(() => {


              //terminado toda la animacion recien elimanos realmente de la interfaz
              setDataCarrito(prevState => {
                let newItems = [...prevState]
                //usar filter con el idProducto
                let filtrado = newItems.filter(dataUnidad => dataUnidad.idProducto !== id)

                return filtrado;
              })

              setLoader(prevState => ({
                ...prevState,
                deleteLoader: { isLoading: false, saveInDatabase: true }
              }))
              ekisElement.style.cursor = "pointer"
              //poner esto de setConteoCar..me salia -1 en el carrito al eliminar
              // setConteoCar(prev => prev) //aqui ya no se resta ya que hay un useEffect que detecta cuando se cambia el estao carrito y automaticamente se resta

              setModifyProduct(prev=>!prev)
            }, 200)
          }, 200)


        }


      })




  }






  const clickRestaProducto = (idRecibido, cantidadProducto) => {
    /*Por otro lado, cuando utilizas paréntesis () alrededor del cuerpo de la función de flecha (prev => (...)), JavaScript asume 
    que todo dentro de los paréntesis es la expresión que 
    se debe devolver. En este caso, estás utilizando la
     notación de objeto ({ ... }), que es una expresión, 
     y por lo tanto, JavaScript interpreta automáticamente
      que eso es lo que debe devolver.*/
    /*setLoader(prev => ({
 ...prev,
 restaLoader: true
}));*/
    //aqui usare esto de momento xd
    restaElementRef.current.style.cursor = "not-allowed"
    setLoader(prev => {
      return (
        {
          ...prev,
          restaLoader: { isLoading: true, saveInDatabase: false }
        }
      )
    })
    //console.log(loader.restaLoader)
    //si aqui vemos que cantidadProducto tiene 1 entonces se resta y seria 0 asi que mejor usar la funcion eliminar
    if (cantidadProducto == 1) {
    //  console.log("se detecto que es 1 entonces mejor se elimina el producto")
      clickBorrarProducto(idRecibido)
      return;
    }
   // console.log("restando producto....")
    const prodCar = localStorage.getItem("prodCar")
    const query = `mutation{restaProducto(idCar:"${prodCar}",idProducto:"${idRecibido}"){
      error,
      cantidadProducto
    }}`

    fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ query })
    }).then(e => e.json())
      .then(e => {



        setDataCarrito(prevState => {
          let newItems = [...prevState] //copiamos el array de objetos

          //modificamos lo necesario 
          newItems[indice].cantidadProducto = e.data.restaProducto.cantidadProducto
          return newItems;
        })

        setLoader(prev => ({
          ...prev,
          restaLoader: { isLoading: false, saveInDatabase: true }
        }))


        restaElementRef.current.style.cursor = "pointer"

        setModifyProduct(prev=>!prev)
      })
  }

  //aqui se ejecuta cuando se da click al icono de sumar.svg
  const clickSumaProducto = (idRecibido) => {
   
   sumaElementRef.current.style.cursor = "not-allowed"

    setLoader(prevState => ({
      ...prevState,
      sumaLoader: { isLoading: true, saveInDatabase: false }
    }))


   // console.log("sumandoPRoducto...")
    const prodCar = localStorage.getItem("prodCar")

    const query = `mutation{addProducto(idCar:"${prodCar}",idProducto:"${idRecibido}"){
      error,
      cantidadProducto,
      idProducto
    }}`
    fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ query })
    }).then(e => e.json())
      .then(e => {
      //  console.log(e)

        //aqui ya no se usa setConteoCar --- porq el useEffect detecta cuando cambia el estado carrito automaticamente cambia ese valor del conteo
        setDataCarrito(prevState => {
          let newItems = [...prevState]


          //este indice se saca del prop (ProductoCar)
          newItems[indice].cantidadProducto = e.data.addProducto.cantidadProducto
          return newItems;

        })

        setLoader(prevState => ({
          ...prevState,
          sumaLoader: { isLoading: false, saveInDatabase: true }
        }))

        sumaElementRef.current.style.cursor = "pointer"
    
        //este modify es para poder escuchar eventos en socket io en el carrito 
        setModifyProduct(prev=>!prev)
      })
  }

  useEffect(() => {
    const funcionAsync = (recibeKey) => {
      if (recibeKey == "deleteLoader") {
       // console.log("DELETEADOOOO")
        clickBorrarProducto(id)
      } else if (recibeKey == "sumaLoader") {
        clickSumaProducto(id)
      } else if (recibeKey == "restaLoader") {
        clickRestaProducto(id, data.cantidadProducto)
      }
    }
    // console.log("****//**")
    Object.keys(loader).forEach(key => {
      //const valor = loader.key.saveInDatabase //esto no funciona porque se lee como "key" literal
      const valor = loader[key].saveInDatabase //esto si funciona porque transforma ese string de variable key a metodo
      // console.log(valor)
      if (valor == false) {
        funcionAsync(key)
      } else if (valor == true) {
      }

    })

  }, [loader.deleteLoader.saveInDatabase, loader.sumaLoader.saveInDatabase, loader.restaLoader.saveInDatabase])


  const LoaderJSX = () => {
    return (<div className={header.circles}>
      <span></span>
      <span></span>
      <span></span>
    </div>)
  }

  const clickModifyState = (typeLoader) => {
    setLoader(prevState => ({
      ...prevState,
      [typeLoader]: { isLoading: true, saveInDatabase: false }
    }))
  }

  //necesito que setDataCarrito(dataCarrito.filter(e=>e.product)
  return (
    <div className={header.productoContainer} id={`prod-${id}`}>
      <div className={header.producto}>
        <div className={header.producto_left}>
          <div className={header.cajaImagen}>
            <div className={header.imagenContainer}>
              <img src={`/${data.imgUrl_first}`} />
            </div>
            <div className={header.ekis} ref={ekisElementRef} onClick={() => clickModifyState("deleteLoader")}>
              {loader.deleteLoader.isLoading == true ?
                <LoaderJSX></LoaderJSX>
                :
                <div className={header.boton}>
                  <svg fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" aria-hidden="true" class="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
              }

            </div>
          </div>
          <div className={header.detalles}>
            <p>{data.nombre_producto}</p>
            <p>
              {data.color}/{data.talla}
            </p>
          </div>
        </div>
        <div className={header.producto_right}>
          <div className={header.top}>
            <p>{data.precio_en_dolares}$USD</p>
          </div>
          <div className={header.bottom}>
            <div className={header.imagen} ref={restaElementRef} onClick={() => clickModifyState("restaLoader")}>

              {loader.restaLoader.isLoading == true ?
                <LoaderJSX></LoaderJSX>

                : <img src="/resta.svg" />
              }
            </div>
            <div className={header.totalItem}>{data.cantidadProducto}</div>
            <div className={header.imagen} ref={sumaElementRef} onClick={() => clickModifyState("sumaLoader")}>
              {loader.sumaLoader.isLoading == true ?
                <LoaderJSX></LoaderJSX>
                : <img src="/suma.svg" />
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CajaCompras() {
  const router = useRouter()
  //este ContextGlobal esta en el archivo layout.jsx
  const { setDataCarrito, dataCarrito } = useContext(ContextGlobal);

  useEffect(() => {
    let total_a_pagar = 0

    dataCarrito.map((dataUnidad, indice) => {
      //aqui sacamos la cuenta cuanto cuesta el producto y cuantos  a agregado al carrito
      const totalPorItem = dataUnidad.cantidadProducto * dataUnidad.precio_en_dolares

      total_a_pagar = totalPorItem;
    })

    const headerCajaElement = document.querySelector(`#total_a_pagar`)
    headerCajaElement.textContent = `${total_a_pagar} $USD`
   // console.log("pagar...")
   // console.log(total_a_pagar)
  }, [dataCarrito])


  const clickGoCaja = ()=>{
    //esto te redirige a la ruta checkout 
    router.push(`/checkout/information`)
  }
  return (
    <div className={header.cajaCompras}>
      <div className={header.caja}>
        {dataCarrito.map((dataUnidad, indice) => {

          return <ProductoCar key={dataUnidad.idProducto}
            id={dataUnidad.idProducto}
            data={dataUnidad}
            indice={indice}
          ></ProductoCar>;
        })}
      </div>
      <div className={header.otros}>
        <div className={header.otros_caja}>
          <p>Impuestos</p>
          <p>0,00 $USD</p>
        </div>
        <div className={header.otros_caja}>
          <p>Shipping</p>
          <p>1.50 $USD</p>
        </div>
        <div className={header.otros_caja}>
          <p>Total</p>
          <p id="total_a_pagar"></p>
        </div>
        <div className={header.otros_botonPagar} onClick={clickGoCaja}>Pasar por la caja</div>
      </div>
    </div>
  );
}





function CarritoPage() {
  const { animCarrito, setAnimCarrito, setMostrarCarrito, conteoCar } =
    useContext(ContextHeader);

  //cuando se da click en botonCarrito animCarrito pasa a true
  const clickCerrarCarrito = () => {
    setAnimCarrito(false);
    setTimeout(() => {
      setMostrarCarrito(false);
    }, 200);
  };

  const clickCarritoLeft = () => {
    clickCerrarCarrito()
  }


  return (
    <div
      className={`${header.carritoPage} ${animCarrito ? "" : header.carritoPageSalida
        }`}
    >
      <div className={header.carritoLeft} style={{ animation: animCarrito ? "" : "carritoLeftSalida ease 100ms forwards" }} onClick={clickCarritoLeft}></div>
      <div
        className={`${header.carritoRight} ${animCarrito ? "" : header.carritoRightSalida
          }`}
      >
        <div className={header.carrito_first}>
          <div>Mi Carrito</div>
          <div className={header.botonContainer} onClick={clickCerrarCarrito}>
            <div className={header.botonEkis}>
              <img src="/ekis.svg" />
            </div>
          </div>
        </div>
        {/*conteoCar == 0*/}
        {conteoCar == 0 ? (
          <div className={header.carrito_vacio}>
            <div>
              <img src="/carrito.svg" />
            </div>
            <p>Tu carrito esta vacio</p>
          </div>
        ) : (
          <CajaCompras></CajaCompras>
        )}
      </div>
    </div>
  );
}

//esto solo se muestra en dispositivos mobiles
function MenuPage() {
  const { setMostrarMenu, animMenu, setAnimMenu } = useContext(ContextHeader);

  const clickCerrarMenu = () => {
    setAnimMenu(false)
    setTimeout(() => {
      setMostrarMenu(false)
    }, 400)
  }
  return (
    <div className={`${header.menuPage} ${animMenu ? "" : header.menuPageSalida}`}>
      <div className={header.menuContainer}>
        <div className={header.menuPageEkis} onClick={clickCerrarMenu}>
          <img src="/ekis.svg" />
        </div>
        <div className={header.menu_inputContainer}>
          <Input></Input>
        </div>
        <ul className={header.menu_lista}>
          <li>Todo</li>
          <li>Camisetas</li>
          <li>Zapatillas</li>
        </ul>
      </div>
    </div>
  );
}

export const ContextHeader = createContext();





export default function Header() {

  //importamos dataCarrito donde se guarda todos los productos de ContextGlobal
  const { setDataCarrito, dataCarrito, setAbrirCarritoFuncion,modifyProduct} = useContext(ContextGlobal)
  //aqui servira para poner la animacion de entrada si es false es porque esta en salida
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  //esto de abajo anima la entrada
  const [animCarrito, setAnimCarrito] = useState(false);

  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [animMenu, setAnimMenu] = useState(false);



  const [conteoCar, setConteoCar] = useState(0)

  useEffect(()=>{

    //aqui cada vez que detecte un cambio en data carrito se actualizara el conteoCar 
    //actualizar el conteoCar
    let conteoCar = 0;
    dataCarrito.map((dataUnidad) => {
      conteoCar += dataUnidad.cantidadProducto
    })

    setConteoCar(conteoCar)

  },[dataCarrito])

  useEffect(() => {

   // console.clear()
   // console.log("MODIFIIIII")


    //si cambia el estado de esto es porque se dio a delete sumar o restar producto

    const prodCar = localStorage.getItem("prodCar")

    const giveAllProductsCarFunction = (dataCarro) => {
    //  console.log("******")
    //  console.log(dataCarro)
      setDataCarrito(dataCarro)

      
    }

    //console.log("MODIFICADOOOOO")
    if (prodCar) {
      socket.emit("envioGiveAllProductsCar", { idCar: prodCar })

      socket.on("give_all_products_car", giveAllProductsCarFunction)

    }

    
    return (() => {
      socket.off("give_all_products_car", giveAllProductsCarFunction)
    })

  }, [,modifyProduct]) //esto se renderiza la primera vez que cargue la pagina y ademas cuando cambie el modifyProduct






  //este boton servira para abrir la pagina del carrito
  const clickMostrarCarrito = () => {


    setMostrarCarrito(true);
    //por alguna razon esto funciona para las animaciones xd
    setAnimCarrito(true);



  };


  const clickMostrarMenu = () => {
    setMostrarMenu(true);
    setAnimMenu(true);
  };




/*
  useEffect(() => {
    //tenemos que recuperar el carrito
    const prodCar = localStorage.getItem("prodCar")



    const giveAllProductsCarFunction = (dataCarro) => {
      setDataCarrito(dataCarro)
    
      console.log("esto es tu carrito")

      console.log(dataCarro)
      console.log("@@♠4@")
    }
    if (prodCar) {


      socket.emit("envioGiveAllProductsCar", { idCar: prodCar })





      socket.on("give_all_products_car", giveAllProductsCarFunction)


      //esto de aca se usara en la ruta /product...cuando se de click en el boton "agregar al carrito" 
      //   setabrirCarritoFuncion(JSON.stringify(clickMostrarCarrito))
      setAbrirCarritoFuncion(() => clickMostrarCarrito)
    }


    return (() => {
    socket.off("give_all_products_car", giveAllProductsCarFunction)
    })
  }, [])


*/


  useEffect(()=>{
   setAbrirCarritoFuncion(() => clickMostrarCarrito)
  },[])

  const router = useRouter()

  const redirect = (url)=>{
    router.push(`/search?ctg=${url}`)
  }
  const value = {
    animCarrito,
    setAnimCarrito,
    setMostrarCarrito,

    mostrarMenu,
    setMostrarMenu,
    setAnimMenu,
    animMenu,

    setConteoCar,
    conteoCar,

    dataCarrito //esto es de contextGlobal

  };


  return (
    <ContextHeader.Provider value={value}>
      <div className={header.container}>
        <div className={header.headerPrincipal}>
          <div className={header.menuBoton} onClick={clickMostrarMenu}>
            <div className={header.menu}>
              <img src="/menu.svg" />
            </div>
          </div>
          <div className={header.headerLeft}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div className={header.perfilContainer}>

                <div className={header.perfil}>
                  <img src="/parrot.jpg" />
                </div>
                {/*aqui pondre LN store pero de momento DIGITAL SPACE*/}
                <span className={header.nombreTienda}>DIGITAL SPACE</span>

              </div>
            </Link>
            <ul className={header.lista}>
              <li onClick={()=>redirect("tecnologia")}>Tecnología</li>
              <li onClick={()=>redirect("novedades")}>Novedades</li>
              <li onClick={()=>redirect("todo")}>Todo</li>
            </ul>
          </div>
          <div className={header.center}>
            <Input></Input>
          </div>
          <div onClick={clickMostrarCarrito} className={header.carritoBoton}>
            <div className={header.carritoImagen}>
              <img src="/carrito.svg" />
            </div>
            {conteoCar > 0 ? <span className={header.carritoConteo}>{conteoCar}</span> : ""}
          </div>
        </div>

        {mostrarCarrito ? <CarritoPage></CarritoPage> : ""}
        {mostrarMenu ? <MenuPage></MenuPage> : ""}
      </div>
    </ContextHeader.Provider>
  );
}
