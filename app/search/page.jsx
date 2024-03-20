"use client";
import search from "./search.module.css";
import Header, { Input } from "@/components/header";
import Footer from "@/components/footer"
import { useState, useEffect, useRef, createContext, useContext } from "react"
import { ProductoItem } from "@/components/producto-item"
import {useRouter} from "next/navigation"
import {ContextGlobal} from "@/app/layout"
import header from "@/components/header.module.css"

function SkeletonSearch() {
  return (
    <div className={search.skeleton}>
      <div className={search.skeleton_content}>
        <div className={search.skeletonPC}>
          <div className={search.pc_left}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={search.pc_center}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={search.pc_right}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={search.skeletonMobile}>
          <div className={search.mb_busqueda}></div>
          <div className={search.mb_first}></div>
          <div className={search.mb_second}></div>
          <div className={search.mb_third}>
            <div style={{ animation: `${search.animLoad} 1.5s linear infinite alternate 0ms` }}></div>
            <div style={{ animation: `${search.animLoad} 1.5s linear infinite alternate 200ms` }}></div>
            <div style={{ animation: `${search.animLoad} 1.5s linear infinite alternate 300ms` }}></div>
            <div style={{ animation: `${search.animLoad} 1.5s linear infinite alternate 500ms` }}></div>
            <div style={{ animation: `${search.animLoad} 1.5s linear infinite alternate 700ms` }}></div>
            <div style={{ animation: `${search.animLoad} 1.5s linear infinite alternate 900ms` }}></div>
            <div style={{ animation: `${search.animLoad} 1.5s linear infinite alternate 1100ms` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CajaLeftPC() {
  const router = useRouter()
  /* const [listaColeccion,setListaColeccion] = useState([])
   useEffect(()=>{
     const query = `query{giveAllCategorias}`
     fetch(`${process.env.NEXT_PUBLIC_api}/graphql`,{
       method:"POST",
       headers:{
         "content-type":"application/json"
       },
       body:JSON.stringify({query})
     }).then(e=>e.json())
     .then(e=>{
 
     })
   },[])*/


  const clickListaItem = (categoriaRecibido)=>{
    router.push(`?ctg=${categoriaRecibido}`)
    console.clear()
    console.log("CLICK ITEM....")
    console.log(categoriaRecibido)
  }


  const { listaCategorias } = useContext(ContextSearch)
  return (
    <div className={search.left}>
      <p>Colección:</p>

      <ul>
        <li onClick={()=>clickListaItem("todo")}>todo</li>
        <li onClick={()=>clickListaItem("novedades")}>novedades</li>
        {listaCategorias.map((dataUnidad, indice) => {
          return (<li key={`categoria-${indice}`} onClick={()=>clickListaItem(dataUnidad.categoria)}>{dataUnidad.categoria}</li>)
        })}
      </ul>

    </div>
  )
}

function CajaLeftMobile() {

  const [verNextClick, setVerNextClick] = useState(false)

  const { listaCategorias } = useContext(ContextSearch)

  //este iterador puse para que no cuenta el primer click que vendri a ser cuando se le da
  //click a "ropa" asi que despues de ese click recien comienzas a escuchar algo asi le digo
  let i = 0
  let clickAfuera = null;
  const funcion = (event) => {
    i++


    if (i > 1) {



      const idElementClick = event.target.getAttribute("id")

      if (idElementClick) {
        const allItemsCategorias = document.querySelectorAll(`.${search.lista} > div`)
        for (let e = 0; e < allItemsCategorias.length; e++) {
          if (allItemsCategorias[e].getAttribute("id") == idElementClick) {
            clickAfuera = false;
          } else {
            clickAfuera = true;
          }
        }
      } else {
        clickAfuera = true;
      }


      if (clickAfuera) {
        const lista = document.querySelector(`.${search.lista}`)


        /*lista.style.transform = "translateY(100%)";*/
        lista.style.opacity = "0"
        lista.style.height = "10px"
        lista.style.visibility = "hidden"
        
        const iconoAbajo = document.querySelector("#iconoAbajo1")
        iconoAbajo.style.transform = "rotate(0deg)"

        //este preventBloq es para cuando se de click a las cajas esas y si el usuario
        //por querer cerrar esa pestaña da click en otro lado y por error da click en productosItems pues le va a redirigir
        const preventBloq = document.querySelector(`.${search.preventBloq}`)
        preventBloq.style.display = "none"
      }




      window.removeEventListener("click", funcion)
      i = 0
    }
  }



  const clickVerColeccion = () => {

    const lista = document.querySelector(`.${search.lista}`)

    console.log("visible")
    lista.style.visibility = "visible"
    lista.style.opacity = "1"
    lista.style.transform = "translateY(105%)"
    lista.style.height = "200px"

    //este icono de aqui es la flecha del input en mobiles se gira
    const iconoAbajo = document.querySelector("#iconoAbajo1")
    iconoAbajo.style.transform = "rotate(-180deg)"

    //este preventBloq es para cuando se de click a las cajas esas y si el usuario
    //por querer cerrar esa pestaña da click en otro lado y por error da click en productosItems pues le va a redirigir
    const preventBloq = document.querySelector(`.${search.preventBloq}`)
    preventBloq.style.display = "block"
    window.addEventListener("click", funcion)
  }



  return (
    <div className={search.leftListaMobile}>
      <div onClick={clickVerColeccion} className={search.elegido}>
        <span>ropas</span>
        <span className={search.iconoAbajo} id="iconoAbajo1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>
        </span>
      </div>
      <div className={search.lista}>
        <div data-name="todo">Todo</div>
        <div data-name="novedades">Novedades</div>
        {listaCategorias.map((dataUnidad, indice) => {
          return (<div key={`categoria-${indice}`} id={`categoria-${indice}`} data-name={dataUnidad.categoria}>{dataUnidad.categoria}</div>)
        })}
      </div>
    </div>
  )
}

function CajaCenter() {
  const { setItemProductos, itemProductos, setNumeroDePagina, numeroDePagina } = useContext(ContextSearch)


  //este loader es para la pagina de productos no usare skeleton se veria feo
  //porq mi productoItem tienen una animacion que inicia de abajo hacia arriba y si pongo skeleton se ve feo
  const [loaderProductos, setLoaderProductos] = useState()


  //aqui uso esto porq es dificil trabajar con eso del asincronismo de los estados de react se 
  //podria hacer usando prevState y envolviendo todo eso dentro de esa funcion pero prefiero usar esto xd
  let newNumeroDePagina = numeroDePagina
  const loadMoreProductos = async (entrada) => {
    //console.log("analizando...")
    //entrada devuelve un array y ps como solo tengo un elemento a observar uso entrada[0]
    //isIntersecting es un metodo que devuelve un boleano 
    if (entrada[0].isIntersecting) {
      setLoaderProductos(true)
      //tengo que lograr que no se sume el numero++ hasta que termine de el fetch 
      // setNumeroDePagina(prev=>prev + 1)

      newNumeroDePagina++
      //aqui borramos el observador hasta esperar que termine el fetch esto para evitar que se hagan muchos fetch
      const detect = document.querySelector(`.${search.detect}`)
      observador.unobserve(detect)
      //si vien es cierto puedo poner un useEffect con parametro [numeroPagina] lo dejare asinoma de momento porq 
      //creo que es mas entendible de momento xd
      const query1 = `query{getProducts(texto_a_buscar:"",numeroDePagina:${newNumeroDePagina},itemsPorPagina:6)
         {
          nombre_producto
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
  
      //  console.log("/////")
      //   console.log(resu1)
      // console.log(resu1.data.getProducts)
      //  setItemProductos(prev=>[...prev,resu1.data.getProducts])
      

      setItemProductos(prevState => [...prevState, ...resu1.data.getProducts])
      setLoaderProductos(false)
      
      //si ya no encuentra nada entonces no ejecutar de nuevo la funcion Obseravodr
      //porq ni bien termina el fetch aparece el observer y como el usuario se encuentra 
      //en esa misma posicion que el elemento ps se vuelve a llamar y si no encuentro nada
      //entonces nunca se agregan productos y el elemento ese nunca baja para abajo llegando a un bucle infinito
      if (resu1.data.getProducts.length == 0) {
      
        console.log("borrando onserber para siempre")
        observador.unobserve(detect)
      } else {
        //en caso de que si encuentre productos entra aqui
        setNumeroDePagina(newNumeroDePagina)
        funcionObservador()
      }

    }
  }

  const observador = new IntersectionObserver(loadMoreProductos, {
    root: null, //si pones null quiere decir que hara referencia al viewport
    rootMargin: "0px 0px -10% 0px",
    threshold: 0 //esto es del 0 al 1 --es si entra si quieres que se muestre cuando entre en un 50% seria 0.5
  })

  const funcionObservador = () => {


    const detect = document.querySelector(`.${search.detect}`)
    observador.observe(detect) //le decimos que tiene que observar le pasamos un elemento
  }

  useEffect(() => {
    funcionObservador()
  }, [])




  return (
    <div className={search.center}>
      <div className={search.preventBloq}></div>
      <div className={search.center_content} style={{height:itemProductos.length == 0?"40vh":"inherit"}}>
        {itemProductos.map((dataUnidad, indice) => {
          return (
            <ProductoItem
              key={dataUnidad.idProducto}
              data={dataUnidad}
              delayAnimation={100 * (indice + 1)}
            ></ProductoItem>
          )
        })}
        <div className={search.detect}></div>
      </div>
      {itemProductos.length == 0?
      <div className={search.notFound}>
        Oh vaya...! no se encontraron resultados :/
      </div>
      :""}
      {loaderProductos && (loaderProductos ?
        <span className={search.loader}></span>
        :
        ""
      )}
    </div>
  )
}

function CajaRightPC() {

  const router = useRouter()
  const redirectSort =  (url)=>{
    router.push(`&sort=${url}`)
  }

  return (
    <div className={search.right}>
      <p>Ordenar por:</p>
      <ul>
        {/*relevancia - tendencias*/}
        <li onClick={()=>redirectSort("price-desc")}>Precios: de menor a mayor</li>
        <li onClick={()=>redirectSort("price-asc")}>Precios: de mayor a menor</li>
      </ul>
    </div>
  )
}



function CajaRightMobile() {
  //este iterador puse para que no cuenta el primer click que vendri a ser cuando se le da
  //click a "ropa" asi que despues de ese click recien comienzas a escuchar algo asi le digo
  let i = 0
  const funcion = (event) => {
    i++


    if (i > 1) {

      const clase = event.target.classList

      if (clase.contains(search.rightLista)) {
        console.log("lista")
      } else if (clase.contains(search.orderASC)) {
        console.log("comida")
      } else if (clase.contains(search.orderDESC)) {
        console.log("otros")
      } else {
        //aqui entra en caso de que se de click en otra parte y si funciona 
        const lista = document.querySelector(`.${search.rightLista}`)


        /* lista.style.transform = "translateY(80%)";*/
        lista.style.opacity = "0"
        lista.style.height = "10px"
        lista.style.visibility = "hidden"
        const iconoAbajo = document.querySelector("#iconoAbajo2")
        iconoAbajo.style.transform = "rotate(0deg)"


        //este preventBloq es para cuando se de click a las cajas esas y si el usuario
        //por querer cerrar esa pestaña da click en otro lado y por error da click en productosItems pues le va a redirigir
        const preventBloq = document.querySelector(`.${search.preventBloq}`)
        preventBloq.style.display = "none"
        window.removeEventListener("click", funcion)
        i = 0

      }
    }
  }

  const clickOrdernar = () => {
    console.log("ordenar")
    const lista = document.querySelector(`.${search.rightLista}`)

    lista.style.visibility = "visible"
    lista.style.opacity = "1"
    lista.style.transform = "translateY(105%)"
    lista.style.height = "80px"

    const iconoAbajo = document.querySelector("#iconoAbajo2")
    iconoAbajo.style.transform = "rotate(-180deg)"


    //este preventBloq es para cuando se de click a las cajas esas y si el usuario
    //por querer cerrar esa pestaña da click en otro lado y por error da click en productosItems pues le va a redirigir
    const preventBloq = document.querySelector(`.${search.preventBloq}`)
    preventBloq.style.display = "block"
    window.addEventListener("click", funcion)
  }

  return (
    <div className={search.rightListaMobile}>
      <div onClick={clickOrdernar} className={search.elegidoRight}>
        <span>Relevancia</span>
        <span id="iconoAbajo2" className={search.iconoAbajo}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>
        </span>
      </div>
      <div className={search.rightLista}>
        <div className={search.orderASC}>Precios: de menor a mayor</div>
        <div className={search.orderDESC}>Precios: de mayor a menor </div>
      </div>
    </div>
  )
}


const ContextSearch = createContext()

export default function App(props) {

  //aqui guardaremos array de productos para el componente CajaCenter
  const [itemProductos, setItemProductos] = useState([])

  //aqui se guardaran las listas para el cajaLeft
  const [listaCategorias, setListaCategorias] = useState([])

  //esto es el loader para mostrar o quitar el skeleton 
  const [loading, setLoading] = useState(true)

  //esto sirve para la paginacion osea que cuando va bajando va aumentando ....
  const [numeroDePagina, setNumeroDePagina] = useState(1)



  //esto obtiene las queryes en este caso se llama asi el q le puse asi por query xd
  let textoBuscado = props.searchParams?.q  //puse el ? por que el usuario puede no poner nada por eso es mejor prevenir
  
  let textoCategoria = props.searchParams?.ctg

 
  const router = useRouter()
  useEffect(() => {
  
    //  alert(textoBuscado)
    //aqui cada vez que actualize la query actualizamos todos los datos
    const funcionAsincrona = async () => {
      let categoria = "";
    
      
      //aqui tenia que poner como string y compararlo eso de tipo null con el textoBuscado
      if (textoBuscado == undefined || textoBuscado == "null") { 
       //aqui entra cuando se da click a un item de categoria
        //si no hay query q="" entonces es porque esta en categoria    
        textoBuscado = "null"
        categoria = `categoria:"${textoCategoria}", `


        //esto de aqui borra el input y lo deja vacio para cuando se haga click en categoria
       const inputChild = document.querySelector(`.${header.inputChild} > input`)
       inputChild.value = ""
        
       const itemCategoria = document.querySelector(`[data-name="${textoCategoria}"]`)
      // itemCategoria.style.background = "red"
   /*   console.clear()
      console.log("adfjskljfksdf")
       console.log(itemCategoria)
     */
      }
      // hacemos peticon a todos los productos como 6 por lo menos
      //aqui le puse 6 items de pagina por que creo que es lo mejor y puse 1 en numeroPagina porq es la primera pagina
      const query1 = `query{getProducts(texto_a_buscar:"${textoBuscado}",${categoria}numeroDePagina:1,itemsPorPagina:6)
         {
          nombre_producto
          precio_en_dolares,
          firstUrlImagen,
          categoria,
          idProducto
        }
      }`
     

      console.log("peticion query::")
      console.log(query1)
     // alert(query1)
      const peticion1 = await fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ query: query1 })
      })

      const resu1 = await peticion1.json()
      console.log("resultado de la query:::")
      console.log(resu1.data.getProducts)
      console.log("END---")
      //alert(resu1.data.getProducts)
     
      setItemProductos(resu1.data.getProducts)

     /*// alert(resu1.data.getProducts)
      if(resu1.data.getProducts !== undefined){
        //esto en caso de que no encuentre nada
        //aqui guardamos en caso de que si haya algo esto uso porque cuando se usa "categorias" hay problemas ahi
        setItemProductos(resu1.data.getProducts)
      }else{
        //aqui no ponemos nada y detectara como 0 
        setItemProductos([])
      }
      */
     // alert(resu1.data.getProducts.length)
    }

    funcionAsincrona()

  }, [textoBuscado,textoCategoria])



  useEffect(() => {
    const funcionAsync = async () => {
      //hacemos peticion allCategorias
      const query2 = `query{giveAllCategorias{categoria}}`
      const peticion2 = await fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json"
        },
        body: JSON.stringify({ query: query2 })
      })
      const resu2 = await peticion2.json()


      setListaCategorias(resu2.data.giveAllCategorias)
      setLoading(false)
    }


    funcionAsync()


    //en caso de que en la ruta /search solo ponga eso y no ponga la query eso pasara solo si lo pone manualmente la url
    //pero igual quiero que se vea bien para eso xd
    //si no hay queries entonces le agregegare el por defecto "ctg=todo"

    if(textoCategoria == undefined && textoBuscado == "null"){
      router.push("?ctg=todo")
    }
    
   
  }, [])
  const value = { itemProductos, setItemProductos, listaCategorias, setNumeroDePagina, numeroDePagina,textoBuscado }
  //esta data es lo que se recibe en la url
  //search?q=juegos
  // console.log(props);
  // const dataQuery = props.searchParams?.q;
  return (
    <ContextSearch.Provider value={value}>

      <div className={search.ventana}>
        <Header></Header>
        {
          loading ? <SkeletonSearch></SkeletonSearch> :
            <>
              <div className={search.searchCaja}>
                <div className={search.searchCaja_content}>
                  <CajaLeftPC></CajaLeftPC>
                  <div className={search.cajaMobileOpciones}>
                    <div className={search.cajaInput}>
                      <Input></Input>
                    </div>
                    <div className={search.fondo}></div>
                    <CajaLeftMobile></CajaLeftMobile>
                    <CajaRightMobile></CajaRightMobile>
                  </div>
                  <CajaCenter></CajaCenter>
                  <CajaRightPC></CajaRightPC>
                </div>
              </div>
              <Footer></Footer></>
        }
      </div>
    </ContextSearch.Provider>
  );
}
